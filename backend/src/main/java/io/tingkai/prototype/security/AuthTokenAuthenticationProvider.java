package io.tingkai.prototype.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

/**
 * Override Spring Authentication flow, check current user's AuthToken is
 * validate or not.
 * 
 * @author tingkai
 */
@Component
public class AuthTokenAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private AuthTokenService authTokenService;

	@Override
	public Authentication authenticate(Authentication authentication) {
		if (authentication.getCredentials() != null) {
			AuthToken authToken = this.authTokenService.validate(authentication.getCredentials().toString());
			if (authToken != null) {
				return new AuthTokenAuthentication(authToken);
			}
		}

		throw new BadCredentialsException("BAD_TOKEN");
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(AuthTokenAuthentication.class);
	}
}