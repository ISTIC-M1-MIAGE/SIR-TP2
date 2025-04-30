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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("city")
@Produces({"application/json"})
public class CityResource {
    private CityDAO cityDAO = new CityDAO();

    @GET
    @Path("/")
    @Operation(summary = "Get all cities")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCities() {
        List<City> cities = cityDAO.findAll();
        return Response.ok().entity(CityDTOout.convertEntitiesToDTOout(cities)).build();
    }
}
