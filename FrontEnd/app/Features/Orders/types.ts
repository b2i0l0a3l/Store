export type order = {
  id: number;
  clientName: string;
  clientId: number;
  total: number;
  remaining: number;
  orderType: string;
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
};
