package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import dao.UserDAO;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "userinfo",
        urlPatterns = {"/UserInfo"})
public class UserServlet extends HttpServlet {
    private UserDAO userDAO = new UserDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        PrintWriter p = new PrintWriter(resp.getOutputStream());
        p.print("Liste des utilisateurs");
        List<User> users = userDAO.findAll();
        for (User user : users) {
            p.print(user.toString());
        }
        p.flush();

    }

    @Override
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");

        PrintWriter out = response.getWriter();
        userDAO.save(
                new User(
                        request.getParameter("lastname"),
                        request.getParameter("firstname"),
                        request.getParameter("email"),
                        request.getParameter("password")
                )
        );


        out.println("<HTML>\n<BODY>\n" +
                "<H1>Recapitulatif des informations</H1>\n" +
                "<UL>\n" +
                " <LI>Nom: "
                + request.getParameter("lastname") + "\n" +
                " <LI>Prenom: "
                + request.getParameter("firstname") + "\n" +
                " <LI>Email: "
                + request.getParameter("email") + "\n" +
                " <LI>Téléphone: "
                + request.getParameter("phone") + "\n" +
                "</UL>\n" +
                "</BODY></HTML>");
    }
}
