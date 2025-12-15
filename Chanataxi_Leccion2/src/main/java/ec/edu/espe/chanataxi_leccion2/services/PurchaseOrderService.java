package ec.edu.espe.chanataxi_leccion2.services;

import ec.edu.espe.chanataxi_leccion2.models.entities.PurchaseOrder;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PurchaseOrderService {

    PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder);

    List<PurchaseOrder> getPurchaseOrders(String q, String status, String currency,
                                          BigDecimal minTotal, BigDecimal maxTotal,
                                          LocalDateTime from, LocalDateTime to);
    Optional<PurchaseOrder> getPurchaseOrderById(Long id);
    PurchaseOrder updatePurchaseOrder(Long id, PurchaseOrder purchaseOrder);
    void deletePurchaseOrder(Long id);
}