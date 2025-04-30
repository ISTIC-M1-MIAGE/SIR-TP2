package rest.auth;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.*;
import jakarta.ws.rs.core.Cookie;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;
import java.security.Principal;


@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
/**
 * AuthFilter is a JAX-RS filter that checks the Authorization header for a JWT token.
 * If the token is valid, it sets the SecurityContext with the user's email.
 * If the token is invalid or missing, it aborts the request with a 401 Unauthorized response.
 */
public class AuthFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            abortWithUnauthorized(requestContext);
            return;
        }

        String token = authHeader.substring("Bearer".length()).trim();
        System.out.println("Received token: " + token);
        try {
            // Validate token
            String email = JwtUtil.validateToken(token).getBody().getSubject();
            System.out.println("Token validated, email: " + email);
            // Set Security Context
            requestContext.setSecurityContext(new JwtSecurityContext(email));
        } catch (Exception e) {
            abortWithUnauthorized(requestContext);
        }
    }

    private void abortWithUnauthorized(ContainerRequestContext requestContext) {
        requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED)
                        .entity("User cannot access the resource.")
                        .build()
        );
    }
}