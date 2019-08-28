package ws;

import entities.Pacient;

import java.util.ArrayList;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@WebService
public interface PacientWS {

	@WebMethod
	public Pacient find(@WebParam(name = "integId") int integId);

	@WebMethod
	public ArrayList<Pacient> findAll();

	@WebMethod
	public boolean insert(@WebParam(name = "name") String name, @WebParam(name = "surname") String surname,
			@WebParam(name = "email") String email, @WebParam(name = "phone") String phone,
			@WebParam(name = "bloodType") String bloodType, @WebParam(name = "healthPlan") String healthPlan,
			@WebParam(name = "integId") int integId);

	@WebMethod
	public boolean update(@WebParam(name = "integId") int integId, @WebParam(name = "name") String name,
			@WebParam(name = "surname") String surname, @WebParam(name = "email") String email,
			@WebParam(name = "phone") String phone, @WebParam(name = "bloodType") String bloodType,
			@WebParam(name = "healthPlan") String healthPlan);

	@WebMethod
	public boolean delete(@WebParam(name = "integId") int integId);

}
