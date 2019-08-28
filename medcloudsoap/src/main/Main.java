package main;

import javax.xml.ws.Endpoint;

import ws.PacientWSImpl;

public class Main {

	public static void main(String[] args) {
		try {
			String host = "http://localhost";
			String port = "4789";
			Endpoint.publish(host + ":" + port + "/ws/pacient", new PacientWSImpl());

			System.out.println("Server is now running on " + host + ":" + port + "/ws/pacient");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
}