package com.sales.orders.repository;

import com.sales.orders.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByEstatusContainingIgnoreCase(String estatus);

    List<Order> findByDireccionEnvioContainingIgnoreCase(String direccionEnvio);

    List<Order> findByUserIdContainingIgnoreCase(String userId);

    List<Order> findByItemsCodigoProductoContainingIgnoreCase(String codigoProducto);
}
