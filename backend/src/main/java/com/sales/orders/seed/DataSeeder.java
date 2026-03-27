package com.sales.orders.seed;

import com.sales.orders.model.Order;
import com.sales.orders.model.OrderItem;
import com.sales.orders.model.User;
import com.sales.orders.repository.OrderRepository;
import com.sales.orders.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public DataSeeder(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public void run(String... args) {

        if (userRepository.count() > 0) {
            return; // If we already have users, we assume data is seeded and skip
        }

        User user1 = new User();
        user1.setNombre("Gabriela");
        user1.setApellidoPaterno("Martinez");
        user1.setApellidoMaterno("Juarez");
        user1.setEmail("gaby@hotmail.com");

        user1 = userRepository.save(user1);

        OrderItem item1 = new OrderItem();
        item1.setCodigoProducto("SKU-123");
        item1.setCantidad(2);
        item1.setPrecio(100);

        OrderItem item2 = new OrderItem();
        item2.setCodigoProducto("SKU-999");
        item2.setCantidad(1);
        item2.setPrecio(50);

        Order order1 = new Order();
        order1.setUserId(user1.getId());
        order1.setDireccionEnvio("Calle Reforma 123");
        order1.setEstatus("CREADO");
        order1.setItems(List.of(item1, item2));
        order1.setTotal(250);

        orderRepository.save(order1);
    }
}
