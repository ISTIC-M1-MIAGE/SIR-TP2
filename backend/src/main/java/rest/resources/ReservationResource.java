package rest.resources;

import dao.PassDAO;
import dao.ReservationDAO;
import dao.UserDAO;
import dto.ReservationDTOin;
import entities.Pass;
import entities.Reservation;
import entities.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("reservation")
public class ReservationResource {

    private ReservationDAO reservationDAO = new ReservationDAO();
    private UserDAO userDAO = new UserDAO();
    private PassDAO passDAO = new PassDAO();

    @GET
    @Path("/")
    @Operation(summary = "Get all reservations")
    public String getAllReservations() {
        return reservationDAO.findAll().toString();
    }

    @GET
    @Path("/{reservationId}")
    @Operation(summary = "Get reservation by ID", description = "Returns a single reservation based on the provided ID")
    @Parameter(description = "ID of the reservation to retrieve", required = true)
    public String getReservationById(@PathParam("reservationId") Long reservationId) {
        return reservationDAO.findOne(reservationId).toString();
    }

    @GET
    @Path("/user/{userId}")
    @Operation(summary = "Get reservations by user ID", description = "Returns a list of reservations associated with the specified user ID")
    @Parameter(description = "ID of the user to retrieve reservations for", required = true)
    public String getReservationsByUserId(@PathParam("userId") Long userId) {
        return reservationDAO.findByUserId(userId).toString();
    }

    @GET
    @Path("/event/{eventId}")
    @Operation(summary = "Get reservations by event ID", description = "Returns a list of reservations associated with the specified event ID")
    @Parameter(description = "ID of the event to retrieve reservations for", required = true)
    public String getReservationsByEventId(@PathParam("eventId") Long eventId) {
        return reservationDAO.findByEventId(eventId).toString();
    }

    @POST
    @Path("/")
    @Consumes("application/json")
    @Operation(summary = "Create a new reservation", description = "Adds a new reservation to the store")
    @Parameter(description = "Reservation object that needs to be added to the store", required = true)
    public Response createReservation(ReservationDTOin reservation) {
        try {
            User user = userDAO.findOne(reservation.getUserId());
            Pass pass = passDAO.findOne(reservation.getPassId());
            if (user == null || pass == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("User or pass not found").build();
            }
            Reservation newReservation = new Reservation(user, pass, reservation.getReservationDate());
            reservationDAO.save(newReservation);
            return Response.status(Response.Status.CREATED).entity("Reservation created").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error creating reservation").build();
        }
    }

}
