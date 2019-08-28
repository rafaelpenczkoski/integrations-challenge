package ws;

import java.sql.SQLException;
import java.util.ArrayList;

import javax.jws.WebParam;
import javax.jws.WebService;

import dao.PacientDAO;
import entities.Pacient;

@WebService (endpointInterface = "ws.PacientWS")
public class PacientWSImpl implements PacientWS {

	private PacientDAO pacientDAO;

	public PacientWSImpl() {
		pacientDAO = new PacientDAO();
	}

	@Override
	public Pacient find(int integId) {
		try {
			return this.pacientDAO.find(integId);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public ArrayList<Pacient> findAll() {
		try {
			return this.pacientDAO.findAll();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean insert(@WebParam(name = "name") String name, @WebParam(name = "surname") String surname,
			@WebParam(name = "email") String email, @WebParam(name = "phone") String phone,
			@WebParam(name = "bloodType") String bloodType, @WebParam(name = "healthPlan") String healthPlan,
			@WebParam(name = "integId") int integId) {
		Pacient pacient = new Pacient(name, surname, email, phone, bloodType, healthPlan, integId);
		try {
			return this.pacientDAO.insert(pacient);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public boolean update(@WebParam(name = "integId") int integId, @WebParam(name = "name") String name,
			@WebParam(name = "surname") String surname, @WebParam(name = "email") String email,
			@WebParam(name = "phone") String phone, @WebParam(name = "bloodType") String bloodType,
			@WebParam(name = "healthPlan") String healthPlan) {
		Pacient pacient = new Pacient(name, surname, email, phone, bloodType, healthPlan, integId);
		try {
			return this.pacientDAO.update(pacient);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public boolean delete(int integId) {
		try {
			return this.pacientDAO.delete(integId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

}
