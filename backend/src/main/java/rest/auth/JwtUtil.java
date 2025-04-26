package rest.auth;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.security.Key;

public class JwtUtil {
    private static final String SECRET = "1NQNnY3SHrZlnbK2jv6+GDwKtkjR3+CW2EuC0wC+d1E="; // at least 256 bits
    private static final Key KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600_000)) // 1 hour
                .signWith(KEY)
                .compact();
    }

    public static Jws<Claims> validateToken(String token) throws JwtException {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token);
    }
}