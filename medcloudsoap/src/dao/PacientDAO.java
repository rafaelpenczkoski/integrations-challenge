package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import entities.Pacient;

public class PacientDAO {

	private String url;
	private String banco;
	private String senha;
	private String driver;
	private Connection con;

	public PacientDAO() {
		url = "jdbc:postgresql://postgres-instance2.c1u3uizgmzqy.us-east-2.rds.amazonaws.com:5432/medcloud";
		banco = "postgres";
		senha = "postgres";
		driver = "org.postgresql.Driver";

		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, banco, senha);

		} catch (ClassNotFoundException ex) {
			System.out.println("Erro no carregamento do driver JDBC: " + ex.getMessage());

		} catch (SQLException sqlEx) {
			System.out.println("Erro na Conexao: " + sqlEx.getMessage());

		}
	}

	public Pacient find(int integId) throws SQLException {
		Pacient pacient = null;
		String sql = "select * from pacient where integ_id = ?";
		PreparedStatement stmt = con.prepareStatement(sql);

		stmt.setInt(1, integId);

		ResultSet rs = stmt.executeQuery();
		if (rs.next()) {
			pacient = new Pacient();
			pacient.setName(rs.getString("name"));
			pacient.setSurname(rs.getString("surname"));
			pacient.setEmail(rs.getString("email"));
			pacient.setPhone(rs.getString("phone"));
			pacient.setBloodType(rs.getString("blood_type"));
			pacient.setHealthPlan(rs.getString("health_plan"));
			pacient.setIntegId(rs.getInt("integ_id"));
		}
		stmt.close();
		return pacient;
	}

	public ArrayList<Pacient> findAll() throws SQLException {
		ArrayList<Pacient> pacients = new ArrayList<Pacient>();
		String sql = "select * from pacient";
		PreparedStatement stmt = con.prepareStatement(sql);

		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Pacient pacient = new Pacient();
			pacient.setName(rs.getString("name"));
			pacient.setSurname(rs.getString("surname"));
			pacient.setEmail(rs.getString("email"));
			pacient.setPhone(rs.getString("phone"));
			pacient.setBloodType(rs.getString("blood_type"));
			pacient.setHealthPlan(rs.getString("health_plan"));
			pacient.setIntegId(rs.getInt("integ_id"));

			pacients.add(pacient);
		}
		stmt.close();
		return pacients;
	}

	public boolean insert(Pacient pacient) throws SQLException {
		String sql = "insert into pacient (name, surname, email, phone, blood_type, health_plan, integ_id) values (?, ?, ?, ?, ?, ?, ?)";
		PreparedStatement stmt = con.prepareStatement(sql);

		stmt.setString(1, pacient.getName());
		stmt.setString(2, pacient.getSurname());
		stmt.setString(3, pacient.getEmail());
		stmt.setString(4, pacient.getPhone());
		stmt.setString(5, pacient.getBloodType());
		stmt.setString(6, pacient.getHealthPlan());
		stmt.setInt(7, pacient.getIntegId());

		int rowCount = stmt.executeUpdate();
		stmt.close();
		
		return rowCount > 0;
	}

	public boolean update(Pacient pacient) throws SQLException {
		String sql = "update pacient set name = ?, surname = ?, email = ?, phone = ?, blood_type = ?, health_plan = ? where integ_id = ?";
		PreparedStatement stmt = con.prepareStatement(sql);

		stmt.setString(1, pacient.getName());
		stmt.setString(2, pacient.getSurname());
		stmt.setString(3, pacient.getEmail());
		stmt.setString(4, pacient.getPhone());
		stmt.setString(5, pacient.getBloodType());
		stmt.setString(6, pacient.getHealthPlan());
		stmt.setInt(7, pacient.getIntegId());

		int rowCount = stmt.executeUpdate();
		stmt.close();
		
		return rowCount > 0;
	}

	public boolean delete(int integId) throws Exception {
		String sql = "delete from pacient where integ_id = ?";
		PreparedStatement stmt = con.prepareStatement(sql);
		
		stmt.setInt(1, integId);

		int rowCount = stmt.executeUpdate();
		stmt.close();
		
		return rowCount > 0;
	}

}
