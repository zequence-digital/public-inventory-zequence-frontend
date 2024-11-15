import { ActiveInvitedUserSchema } from "@/schemas/settings/active-invited-user-schema";
import { AddCategorySchema } from "@/schemas/categories/add-category-schema";
import { AddProductSchema } from "@/schemas/products/add-product-schema";
import { AddSalesSchema } from "@/schemas/sales/add-sales-schema";
import { AddStockRequestSchema } from "@/schemas/stocks/request/add-stock-request-schema";
import { AddStockSchema } from "@/schemas/stocks/add-stock-schema";
import { AddStockUsageSchema } from "@/schemas/stocks/stock-usage/add-stock-usage-schema";
import { AllCategorySchema } from "@/schemas/categories/all-category-schema";
import { AllCountriesSchema } from "@/schemas/all-countries-schema";
import { AllInvitedUsersSchema } from "@/queries/settings/user-and-role/schemas/all-invited-users-schema";
import { AllProductSchema } from "@/schemas/products/get-all-product-schema";
import { AllSalesSchema } from "@/schemas/sales/all-sales-schema";
import { AllStockSchema } from "@/schemas/stocks/get-all-stock-schema";
import { CreateOrganizationBranchSchema } from "@/schemas/branch/create-organization-branch";
import { DashboardItemsSchema } from "@/schemas/dashboard/items-schema";
import { DashboardOverviewSchema } from "@/schemas/dashboard/overview-schema";
import { GetAllGroupStockUsageSchema } from "@/schemas/stocks/stock-usage/get-all-group-stock-usage-schema";
import { GetAllNotificationSchema } from "@/queries/notifications/schemas/get-all-notification-schema";
import { GetAllOrganizationBranchSchema } from "@/schemas/branch/get-all-organization-branch";
import { GetAllStockUsageSchema } from "@/schemas/stocks/stock-usage/get-all-stock-usage-schema";
import { GetBranchByIdSchema } from "@/schemas/branch/get-branch-by-id-schema";
import { GetBranchesSchema } from "@/schemas/stocks/get-branches-schema";
import { GetStockRequestSchema } from "@/schemas/stocks/request/get-stock-request.schema";
import { GetStockTransferSchema } from "@/schemas/stocks/transfer/get-stock-transfer-schema";
import { GroupSalesSchema } from "@/schemas/sales/group-sales-schema";
import { InviteUserSchema } from "@/schemas/settings/invite-user-schema";
import { LgaSchema } from "@/schemas/all-lga";
import { LoginResponseSchema } from "./auth/schema/login-response-schema";
import { NewInviteeSchema } from "@/schemas/new-invitee-schema";
import { SingleCategorySchema } from "@/schemas/categories/single-category";
import { SingleGroupSalesSchema } from "@/schemas/sales/single-group-sales-schema";
import { SingleGroupStockUsageSchema } from "@/schemas/stocks/stock-usage/single-group-stock-usage-schema";
import { SingleProductSchema } from "@/schemas/products/get-single-product-schema";
import { SingleSaleSchema } from "@/schemas/sales/single-sale-schema";
import { SingleStockRequestSchema } from "@/schemas/stocks/request/single-stock-request-schema";
import { SingleStockSchema } from "@/schemas/stocks/get-single-stock-schema";
import { SingleStockTransfer } from "@/schemas/stocks/transfer/single-stock-transfer-schema";
import { SingleStockUsageSchema } from "@/schemas/stocks/stock-usage/single-stock-usage-schema";
import { StateSchema } from "@/schemas/all-states-schema";
import { UsersLoggedIn } from "@/schemas/auth/users-logged-in";
import { completeSignUpSchema } from "@/schemas/complete-registration";
import { z } from "zod";

// SALES
export type AllSalesData = z.infer<typeof AllSalesSchema>;
export type SingleSale = z.infer<typeof SingleSaleSchema>;
export type AddSales = z.infer<typeof AddSalesSchema>;

// GROUP SALES
export type GroupSales = z.infer<typeof GroupSalesSchema>;
export type SingleGroupSales = z.infer<typeof SingleGroupSalesSchema>;

// DASHBOARD
export type DashboardOverview = z.infer<typeof DashboardOverviewSchema>;
export type DashboardItems = z.infer<typeof DashboardItemsSchema>;

// CATEGORIES
export type UpdateCategory = AddCategory & { guid: string };
export type AllCategory = z.infer<typeof AllCategorySchema>;
export type SingleCategory = z.infer<typeof SingleCategorySchema>;
export type AddCategory = z.infer<typeof AddCategorySchema> & {
  subCategory: boolean;
};

// GENERIC
export type AllStates = z.infer<typeof StateSchema>;
export type GetBranches = z.infer<typeof GetBranchesSchema>;
export type LgaByState = z.infer<typeof LgaSchema>;
export type AllCountries = z.infer<typeof AllCountriesSchema>;

// AUTH
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type UsersLoggedIn = z.infer<typeof UsersLoggedIn>;
export type CompleteSignUp = z.infer<typeof completeSignUpSchema>;

// INVITE USER
export type InviteUser = z.infer<typeof InviteUserSchema>;
export type NewInvitee = z.infer<typeof NewInviteeSchema>;
export type ActiveInvitedUser = z.infer<typeof ActiveInvitedUserSchema>;
export type AllInvitedUsers = z.infer<typeof AllInvitedUsersSchema>;
export type AssignInvitedUserRole = {
  emailAddress: string;
  roleName: string;
};

// PRODUCTS
export type AddProduct = z.infer<typeof AddProductSchema>;
export type AllProduct = z.infer<typeof AllProductSchema>;
export type SingleProduct = z.infer<typeof SingleProductSchema>;
export type UpdateProduct = AddProduct & { guid: string };

// STOCKS
export type AllStock = z.infer<typeof AllStockSchema>;
export type SingleStock = z.infer<typeof SingleStockSchema>;
export type AddStock = z.infer<typeof AddStockSchema>;
export type UpdateStock = AddStock & { guid: string };
export type UpdateSale = AddSales & { guid: string };

// STOCK REQUEST
export type GetStockRequest = z.infer<typeof GetStockRequestSchema>;
export type SingleStockRequest = z.infer<typeof SingleStockRequestSchema>;
export type AddStockRequest = z.infer<typeof AddStockRequestSchema>;
export type UpdateStockRequest = Omit<
  AddStockRequest,
  "stockReferenceNumber" | "quantity"
> & {
  guid: string;
};

//  STOCK TRANSFER
export type GetStockTransfer = z.infer<typeof GetStockTransferSchema>;
export type SingleStockTransfer = z.infer<typeof SingleStockTransfer>;

export type AddStockTransfer = {
  stockReferenceNumber: string;
  quantity: number;
  fromBranchId: number;
  toBranchId: number;
};
export type UpdateStockTransfer = Omit<
  AddStockTransfer,
  "stockReferenceNumber" | "quantity"
> & {
  guid: string;
};

// STOCK USAGE
export type GetAllStockUsage = z.infer<typeof GetAllStockUsageSchema>;
export type SingleStockUsage = z.infer<typeof SingleStockUsageSchema>;
export type AddStockUsage = z.infer<typeof AddStockUsageSchema>;
export type UpdateStockUsage = AddStockUsage & { guid: string };

// GROUP STOCK USAGE
export type GetAllGroupStockUsage = z.infer<typeof GetAllGroupStockUsageSchema>;
export type SingleGroupStockUsage = z.infer<typeof SingleGroupStockUsageSchema>;

// NOTIFICATIONS
export type GetAllNotifications = z.infer<typeof GetAllNotificationSchema>;

// BRANCH
export type GetAllOrganizationBranch = z.infer<
  typeof GetAllOrganizationBranchSchema
>;
export type CreateOrganizationBranch = z.infer<
  typeof CreateOrganizationBranchSchema
>;
export type UpdateOrganizationBranch = CreateOrganizationBranch & {
  branchId: number;
};
export type GetBranchById = z.infer<typeof GetBranchByIdSchema>;
