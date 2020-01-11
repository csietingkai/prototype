package io.tingkai.prototype.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.tingkai.prototype.controller.AuthController;
import io.tingkai.prototype.security.AuthTokenAuthenticationFilter;
import io.tingkai.prototype.security.AuthTokenAuthenticationProvider;

/**
 * Setting for login token, create filter to block requests without tokenString
 * 
 * @author tingkai
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private AuthTokenAuthenticationProvider authAuthenticationProvider;

	@Autowired
	private AuthTokenAuthenticationFilter authTokenAuthenticationFilter;

	@Bean(name = "authenticationManager")
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(this.authAuthenticationProvider);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().disable().csrf().disable().authorizeRequests()
				.antMatchers(AuthController.LOGIN_PATH, AuthController.REGISTER_PATH, AuthController.CONFIRM_PATH)
				.permitAll().anyRequest().authenticated().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(this.authTokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	}
}
