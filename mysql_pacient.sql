create table pacient
	(pacient_id integer not null auto_increment
	,name     	 varchar(100) not null
	,surname  	 varchar(100) not null
	,email    	 varchar(100) not null
	,phone		 varchar(50)
	,blood_type	 varchar(10) not null
	,health_plan varchar(100)
	,primary key (pacient_id));