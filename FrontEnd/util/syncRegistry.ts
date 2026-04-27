import { addCategory, updateCategory, deleteCategory } from "../Features/Categories/api/categoryApi";
import { addClient, updateClient, deleteClient } from "../Features/clients/api/clientApi";
import { addProduct, updateProduct, deleteProduct } from "../Features/Products/api/productApi";
import { buy, deleteOrder } from "../Features/Orders/api/orderApi";
import { pay } from "../Features/Debts/api/paymentApi";
import { UpdatePayment, DeletePayment } from "../Features/Payments/api/paymentApi";

// Convert Base64 payload back to FormData for product uploads
const restoreFormData = (payload: any) => {
  const formData = new FormData();
  if (payload.id) formData.append('id', payload.id);
  if (payload.name) formData.append('name', payload.name);
  if (payload.barCode) formData.append('barCode', payload.barCode);
  if (payload.price) formData.append('price', payload.price.toString());
  if (payload.cost) formData.append('cost', payload.cost.toString());
  if (payload.quantity) formData.append('quantity', payload.quantity.toString());
  if (payload.categoryId) formData.append('categoryId', payload.categoryId.toString());
  
  if (payload.imageFileBase64 && payload.imageFileName && payload.imageFileType) {
    // Convert base64 back to File
    const byteString = atob(payload.imageFileBase64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const file = new File([ab], payload.imageFileName, { type: payload.imageFileType });
    formData.append('imageFile', file);
  }
  return formData;
};

export const syncHandlers: Record<string, (payload: any) => Promise<any>> = {
  'ADD_CATEGORY': addCategory,
  'UPDATE_CATEGORY': updateCategory,
  'DELETE_CATEGORY': (payload) => deleteCategory({ id: payload.id }),
  
  'ADD_CLIENT': addClient,
  'UPDATE_CLIENT': updateClient,
  'DELETE_CLIENT': (payload) => deleteClient({ id: payload.id }),
  
  'ADD_PRODUCT': (payload) => addProduct(restoreFormData(payload)),
  'UPDATE_PRODUCT': (payload) => updateProduct(restoreFormData(payload)),
  'DELETE_PRODUCT': (payload) => deleteProduct({ id: payload.id }),
  
  'BUY': buy,
  'CREDIT': buy,
  'DELETE_ORDER': (payload) => deleteOrder(payload.id),
  
  'ADD_PAYMENT': pay,
  'UPDATE_PAYMENT': UpdatePayment,
  'DELETE_PAYMENT': (payload) => DeletePayment(payload.id),
};
