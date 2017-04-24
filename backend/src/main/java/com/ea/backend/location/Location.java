package com.ea.backend.location;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "location")
public class Location {
	
	public Location(){}
	
	public Location(long locId, String locationCity) {
		this.locId = locId;
		this.locationCity = locationCity;
	}

	public Location(String locationCity) {
		this.locationCity = locationCity;
	}
	public long getLocId() {
		return locId;
	}
	public void setLocId(long locId) {
		this.locId = locId;
	}
	public String getLocationCity() {
		return locationCity;
	}
	public void setLocationCity(String locationCity) {
		this.locationCity = locationCity;
	}
	@Id
	@Column(name = "loc_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long locId;
	@Column(name = "location_city", nullable = false)
	private String locationCity;
}
