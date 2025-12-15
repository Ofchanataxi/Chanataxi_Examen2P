package ec.edu.espe.chanataxi_leccion2.services;

import ec.edu.espe.chanataxi_leccion2.models.entities.PurchaseOrder;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface PurchaseOrderService {

    PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder);

    List<PurchaseOrder> getPurchaseOrders(String q, String status, String currency,
                                          BigDecimal minTotal, BigDecimal maxTotal,
                                          LocalDateTime from, LocalDateTime to);
}