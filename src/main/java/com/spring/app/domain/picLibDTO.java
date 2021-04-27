package com.spring.app.domain;

public class picLibDTO {
	private int plUid;
	private String name;
	private String type;
	private long size;
	private String path;
	private int pcuid;
	private String pl_name;
	
	
	
	public int getPcuid() {
		return pcuid;
	}

	public void setPcuid(int pcuid) {
		this.pcuid = pcuid;
	}

	public String getPl_name() {
		return pl_name;
	}

	public void setPl_name(String pl_name) {
		this.pl_name = pl_name;
	}

	public int getPcUid() {
		return pcuid;
	}

	public void setPcUid(int pcuid) {
		this.pcuid = pcuid;
	}

	
	public int getPlUid() {
		return plUid;
	}
	public void setPlUid(int plUid) {
		this.plUid = plUid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public long getSize() {
		return size;
	}
	public void setSize(long size) {
		this.size = size;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	
}