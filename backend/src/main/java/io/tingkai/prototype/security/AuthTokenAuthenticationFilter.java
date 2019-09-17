package io.tingkai.prototype.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

@Component
public class AuthTokenAuthenticationFilter extends GenericFilterBean {

	@Autowired
	protected AuthenticationManager authenticationManager;

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;

		String authTokenString = request.getHeader("X-Auth-Token");
		if (authTokenString != null) {
			AuthTokenAuthentication authTokenAuthentication = new AuthTokenAuthentication(authTokenString);
			try {
				Authentication authentication = this.authenticationManager.authenticate(authTokenAuthentication);
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} catch (AuthenticationException e) {
				SecurityContextHolder.getContext().setAuthentication(null);
			}
		} else {
			SecurityContextHolder.getContext().setAuthentication(null);
		}

		chain.doFilter(req, res);
	}
}
