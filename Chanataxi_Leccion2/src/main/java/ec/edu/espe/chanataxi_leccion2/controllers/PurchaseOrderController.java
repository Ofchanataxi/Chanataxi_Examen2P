package ec.edu.espe.chanataxi_leccion2.controllers;

import ec.edu.espe.chanataxi_leccion2.models.entities.PurchaseOrder;
import ec.edu.espe.chanataxi_leccion2.services.PurchaseOrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/purchase-orders")
@CrossOrigin(origins = "*")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderService service;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody PurchaseOrder purchaseOrder) {
        try {
            return ResponseEntity.ok(service.createPurchaseOrder(purchaseOrder));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String currency,
            @RequestParam(required = false) BigDecimal minTotal,
            @RequestParam(required = false) BigDecimal maxTotal,
            @RequestParam(required = false) LocalDateTime from,
            @RequestParam(required = false) LocalDateTime to
    ) {
        try {
            List<PurchaseOrder> orders = service.getPurchaseOrders(q, status, currency, minTotal, maxTotal, from, to);
            return ResponseEntity.ok(orders);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}