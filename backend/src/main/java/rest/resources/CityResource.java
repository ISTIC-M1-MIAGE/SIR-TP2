package rest.resources;

import dao.CityDAO;
import dao.EventDAO;
import dao.UserDAO;
import dto.CityDTOout;
import dto.EventDTOin;
import dto.EventDTOout;
import entities.City;
import entities.Event;
import entities.User;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("city")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CityResource {
    private final CityDAO cityDAO = new CityDAO();

    @GET
    @Path("/")
    public Response getCities() {
        List<City> cities = cityDAO.findAll();
        return Response.ok().entity(CityDTOout.convertEntitiesToDTOout(cities)).build();
    }
}
