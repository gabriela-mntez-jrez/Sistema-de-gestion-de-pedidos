package com.sales.orders.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String email;
}
