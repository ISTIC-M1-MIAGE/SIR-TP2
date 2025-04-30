package rest.auth;

import jakarta.ws.rs.core.SecurityContext;

import java.security.Principal;

public class JwtSecurityContext implements SecurityContext {

    private final String email;

    public JwtSecurityContext(String email) {
        this.email = email;
    }

    @Override
    public Principal getUserPrincipal() {
        return () -> email;
    }

    @Override
    public boolean isUserInRole(String role) {
        return false; // You can implement role checking if needed
    }

    @Override
    public boolean isSecure() {
        return false; // or check requestContext.getUriInfo().getAbsolutePath().getScheme().equals("https");
    }

    @Override
    public String getAuthenticationScheme() {
        return "Bearer";
    }
}
