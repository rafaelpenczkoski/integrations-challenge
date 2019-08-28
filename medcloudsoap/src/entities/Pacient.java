package entities;

public class Pacient {

	private String name;
	private String surname;
	private String email;
	private String phone;
	private String bloodType;
	private String healthPlan;
	private int integId;

	public Pacient() {

	}

	public Pacient(String name, String surname, String email, String phone, String bloodType, String healthPlan, int integId) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.phone = phone;
		this.bloodType = bloodType;
		this.healthPlan = healthPlan;
		this.integId = integId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getIntegId() {
		return integId;
	}

	public void setIntegId(int integId) {
		this.integId = integId;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getBloodType() {
		return bloodType;
	}

	public void setBloodType(String bloodType) {
		this.bloodType = bloodType;
	}

	public String getHealthPlan() {
		return healthPlan;
	}

	public void setHealthPlan(String healthPlan) {
		this.healthPlan = healthPlan;
	}

}
