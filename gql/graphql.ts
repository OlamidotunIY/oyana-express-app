/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** BigInt custom scalar type for money amounts in minor units */
  BigInt: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type ActivateRoleInput = {
  businessName?: InputMaybe<Scalars['String']['input']>;
  targetRole: UserType;
};

export type AddDisputeCommentDto = {
  disputeId: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type AddShipmentItemDto = {
  name: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  shipmentId: Scalars['String']['input'];
  weightKg?: InputMaybe<Scalars['Float']['input']>;
};

export type AddressSuggestion = {
  __typename?: 'AddressSuggestion';
  description: Scalars['String']['output'];
  mainText?: Maybe<Scalars['String']['output']>;
  placeId: Scalars['String']['output'];
  secondaryText?: Maybe<Scalars['String']['output']>;
};

export type AdminDashboard = {
  __typename?: 'AdminDashboard';
  activeFleet: Array<AdminDashboardFleetRow>;
  deliveryPerformance: Array<AdminDashboardPerformancePoint>;
  fleetMap: Array<AdminDashboardFleetPoint>;
  generatedAt: Scalars['DateTime']['output'];
  interval: AdminDashboardInterval;
  notifications: Array<AdminDashboardNotificationMetric>;
  orderStatus: Array<AdminDashboardOrderStatusMetric>;
  overview: AdminDashboardOverview;
  rangeFrom: Scalars['DateTime']['output'];
  rangeTo: Scalars['DateTime']['output'];
  wallet: AdminDashboardWalletSummary;
};

export type AdminDashboardFilterDto = {
  fleetLimit?: InputMaybe<Scalars['Int']['input']>;
  fleetSearch?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  interval?: InputMaybe<AdminDashboardInterval>;
  shipmentMode?: InputMaybe<ShipmentMode>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AdminDashboardFleetPoint = {
  __typename?: 'AdminDashboardFleetPoint';
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  shipmentId: Scalars['String']['output'];
  status: AdminFleetStatus;
  trackingCode: Scalars['String']['output'];
};

export type AdminDashboardFleetRow = {
  __typename?: 'AdminDashboardFleetRow';
  etaMinutes?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  shipmentId: Scalars['String']['output'];
  status: AdminFleetStatus;
  to?: Maybe<Scalars['String']['output']>;
  trackingCode: Scalars['String']['output'];
};

export enum AdminDashboardInterval {
  Daily = 'DAILY',
  Hourly = 'HOURLY'
}

export type AdminDashboardNotificationMetric = {
  __typename?: 'AdminDashboardNotificationMetric';
  audience: NotificationAudience;
  totalCount: Scalars['Int']['output'];
  unreadCount: Scalars['Int']['output'];
};

export type AdminDashboardOrderStatusMetric = {
  __typename?: 'AdminDashboardOrderStatusMetric';
  count: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type AdminDashboardOverview = {
  __typename?: 'AdminDashboardOverview';
  activeTrucks: Scalars['Int']['output'];
  avgDeliveryMinutes: Scalars['Int']['output'];
  onTimeDeliveryRate: Scalars['Float']['output'];
  totalShipmentsToday: Scalars['Int']['output'];
};

export type AdminDashboardPerformancePoint = {
  __typename?: 'AdminDashboardPerformancePoint';
  bucketStart: Scalars['DateTime']['output'];
  delayed: Scalars['Int']['output'];
  delivered: Scalars['Int']['output'];
  label: Scalars['String']['output'];
};

export type AdminDashboardWalletSummary = {
  __typename?: 'AdminDashboardWalletSummary';
  balanceMinor: Scalars['BigInt']['output'];
  currency: Scalars['String']['output'];
  escrowMinor: Scalars['BigInt']['output'];
};

export type AdminFinanceSummary = {
  __typename?: 'AdminFinanceSummary';
  currency: Scalars['String']['output'];
  overdueInvoiceAmountMinor: Scalars['BigInt']['output'];
  overdueInvoiceCount: Scalars['Int']['output'];
  pendingRefundAmountMinor: Scalars['BigInt']['output'];
  pendingRefundCount: Scalars['Int']['output'];
  totalEscrowMinor: Scalars['BigInt']['output'];
  totalWalletBalanceMinor: Scalars['BigInt']['output'];
};

export enum AdminFleetStatus {
  Delayed = 'DELAYED',
  InTransit = 'IN_TRANSIT',
  Stationary = 'STATIONARY'
}

export type AdminOverview = {
  __typename?: 'AdminOverview';
  activeShipments: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
  openDispatchBatches: Scalars['Int']['output'];
  openDisputes: Scalars['Int']['output'];
  openFraudFlags: Scalars['Int']['output'];
  openMarketplaceRequests: Scalars['Int']['output'];
  openSupportTickets: Scalars['Int']['output'];
  pendingKycReviews: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
  walletBalanceMinor: Scalars['BigInt']['output'];
  walletEscrowMinor: Scalars['BigInt']['output'];
};

export type AdminProviderOverview = {
  __typename?: 'AdminProviderOverview';
  activeAssignments: Scalars['Int']['output'];
  businessName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  kycStatus: Scalars['String']['output'];
  openOffers: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ApproveRefundDto = {
  approved: Scalars['Boolean']['input'];
  refundId: Scalars['String']['input'];
};

export type AssignShipmentDto = {
  agreedPriceMinor?: InputMaybe<Scalars['BigInt']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  dispatchOfferId?: InputMaybe<Scalars['String']['input']>;
  driverProfileId?: InputMaybe<Scalars['String']['input']>;
  providerId: Scalars['String']['input'];
  shipmentId: Scalars['String']['input'];
  vehicleId?: InputMaybe<Scalars['String']['input']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: Profile;
};

export type AwardShipmentBidDto = {
  awardedByProfileId?: InputMaybe<Scalars['String']['input']>;
  bidId: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  shipmentId: Scalars['String']['input'];
};

export enum BidStatus {
  Accepted = 'ACCEPTED',
  Active = 'ACTIVE',
  Rejected = 'REJECTED',
  Withdrawn = 'WITHDRAWN'
}

export type CancelShipmentDto = {
  cancellationReason: Scalars['String']['input'];
  shipmentId: Scalars['String']['input'];
};

export type ConfirmWalletFundingInput = {
  reference: Scalars['String']['input'];
};

export type CreateDispatchBatchDto = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  shipmentId: Scalars['String']['input'];
};

export type CreateDispatchOfferDto = {
  batchId: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  providerEtaMinutes?: InputMaybe<Scalars['Float']['input']>;
  providerId: Scalars['String']['input'];
  shipmentId: Scalars['String']['input'];
  vehicleId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDisputeDto = {
  category: Scalars['String']['input'];
  invoiceId?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
  referenceId?: InputMaybe<Scalars['String']['input']>;
  shipmentId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInvoiceDto = {
  currency?: InputMaybe<Scalars['String']['input']>;
  dueAt?: InputMaybe<Scalars['DateTime']['input']>;
  lineItems: Array<CreateInvoiceLineItemDto>;
  notes?: InputMaybe<Scalars['String']['input']>;
  profileId: Scalars['String']['input'];
  shipmentId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInvoiceLineItemDto = {
  description: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
  unitAmountMinor: Scalars['BigInt']['input'];
};

export type CreateKycUploadUrlDto = {
  fileName: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  sizeBytes?: InputMaybe<Scalars['BigInt']['input']>;
};

export type CreateShipmentBidDto = {
  amountMinor: Scalars['BigInt']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  shipmentId: Scalars['String']['input'];
};

export type CreateShipmentDto = {
  customerProfileId: Scalars['String']['input'];
  dropoffAddressId: Scalars['String']['input'];
  finalPriceMinor?: InputMaybe<Scalars['BigInt']['input']>;
  mode: ShipmentMode;
  packageDescription?: InputMaybe<Scalars['String']['input']>;
  packageValueMinor?: InputMaybe<Scalars['BigInt']['input']>;
  pickupAddressId: Scalars['String']['input'];
  pricingCurrency?: InputMaybe<Scalars['String']['input']>;
  quotedPriceMinor?: InputMaybe<Scalars['BigInt']['input']>;
  requiresEscrow?: InputMaybe<Scalars['Boolean']['input']>;
  scheduleType?: InputMaybe<ShipmentScheduleType>;
  scheduledAt?: InputMaybe<Scalars['DateTime']['input']>;
  specialInstructions?: InputMaybe<Scalars['String']['input']>;
  trackingCode?: InputMaybe<Scalars['String']['input']>;
  vehicleCategory: VehicleCategory;
};

export type CreateSlaRuleDto = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  key: Scalars['String']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  scope: SlaRuleScope;
  value: Scalars['JSON']['input'];
  vehicleCategory?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSupportTicketDto = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  priority?: InputMaybe<SupportTicketPriority>;
  referenceId?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};

export type CreateUserAddressDto = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  placeId: Scalars['String']['input'];
};

export type CreateVehicleDto = {
  capacityKg?: InputMaybe<Scalars['Int']['input']>;
  capacityVolumeCm3?: InputMaybe<Scalars['BigInt']['input']>;
  category: VehicleCategory;
  color?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  plateNumber?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  vin?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWalletFundingInput = {
  amountMinor: Scalars['BigInt']['input'];
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  idempotencyKey: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  savedCardMethodId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWalletWithdrawalInput = {
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  amountMinor: Scalars['BigInt']['input'];
  bankCode?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  idempotencyKey: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  saveAccount?: InputMaybe<Scalars['Boolean']['input']>;
  savedBankAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type DispatchBatch = {
  __typename?: 'DispatchBatch';
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  openedAt?: Maybe<Scalars['DateTime']['output']>;
  shipmentId: Scalars['String']['output'];
  status: DispatchBatchStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum DispatchBatchStatus {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Expired = 'EXPIRED',
  Open = 'OPEN'
}

export type DispatchOffer = {
  __typename?: 'DispatchOffer';
  batchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  providerEtaMinutes?: Maybe<Scalars['Float']['output']>;
  providerId: Scalars['String']['output'];
  respondedAt?: Maybe<Scalars['DateTime']['output']>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  shipmentId: Scalars['String']['output'];
  status: DispatchOfferStatus;
  updatedAt: Scalars['DateTime']['output'];
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export enum DispatchOfferStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Declined = 'DECLINED',
  Expired = 'EXPIRED',
  Sent = 'SENT',
  Viewed = 'VIEWED'
}

export type DisputeCase = {
  __typename?: 'DisputeCase';
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  disputeNumber: Scalars['String']['output'];
  events?: Maybe<Array<DisputeEvent>>;
  id: Scalars['ID']['output'];
  invoiceId?: Maybe<Scalars['String']['output']>;
  ownerProfileId: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  referenceId?: Maybe<Scalars['String']['output']>;
  resolutionSummary?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  resolvedByProfileId?: Maybe<Scalars['String']['output']>;
  shipmentId?: Maybe<Scalars['String']['output']>;
  status: DisputeStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type DisputeEvent = {
  __typename?: 'DisputeEvent';
  actorProfileId?: Maybe<Scalars['String']['output']>;
  actorRole: ShipmentActorRole;
  createdAt: Scalars['DateTime']['output'];
  disputeCaseId: Scalars['String']['output'];
  eventType: DisputeEventType;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
};

export enum DisputeEventType {
  Comment = 'COMMENT',
  Created = 'CREATED',
  Resolved = 'RESOLVED',
  StatusChanged = 'STATUS_CHANGED'
}

export enum DisputeStatus {
  Investigating = 'INVESTIGATING',
  Open = 'OPEN',
  Rejected = 'REJECTED',
  Resolved = 'RESOLVED'
}

export type FlagFraudCaseDto = {
  invoiceId?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  reason: Scalars['String']['input'];
  severity?: InputMaybe<FraudSeverity>;
  shipmentId?: InputMaybe<Scalars['String']['input']>;
  targetId: Scalars['String']['input'];
  targetType: FraudTargetType;
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type FraudFlag = {
  __typename?: 'FraudFlag';
  assignedToProfileId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  flagCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invoiceId?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  raisedByProfileId?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  resolvedByProfileId?: Maybe<Scalars['String']['output']>;
  severity: FraudSeverity;
  shipmentId?: Maybe<Scalars['String']['output']>;
  status: FraudStatus;
  targetId: Scalars['String']['output'];
  targetType: FraudTargetType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum FraudSeverity {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum FraudStatus {
  Dismissed = 'DISMISSED',
  Open = 'OPEN',
  Resolved = 'RESOLVED',
  UnderReview = 'UNDER_REVIEW'
}

export enum FraudTargetType {
  Dispute = 'DISPUTE',
  Invoice = 'INVOICE',
  Other = 'OTHER',
  Profile = 'PROFILE',
  Provider = 'PROVIDER',
  Shipment = 'SHIPMENT',
  Wallet = 'WALLET'
}

export type Invoice = {
  __typename?: 'Invoice';
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  dueAt?: Maybe<Scalars['DateTime']['output']>;
  feeMinor: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  invoiceNumber: Scalars['String']['output'];
  issuedAt: Scalars['DateTime']['output'];
  lineItems?: Maybe<Array<InvoiceLineItem>>;
  notes?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  profileId: Scalars['String']['output'];
  shipmentId?: Maybe<Scalars['String']['output']>;
  status: InvoiceStatus;
  subtotalMinor: Scalars['BigInt']['output'];
  taxMinor: Scalars['BigInt']['output'];
  totalMinor: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InvoiceLineItem = {
  __typename?: 'InvoiceLineItem';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invoiceId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  totalAmountMinor: Scalars['BigInt']['output'];
  unitAmountMinor: Scalars['BigInt']['output'];
};

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export type KycUploadUrl = {
  __typename?: 'KycUploadUrl';
  expiresAt: Scalars['DateTime']['output'];
  mediaId: Scalars['String']['output'];
  storageBucket: Scalars['String']['output'];
  storagePath: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
};

export type MarketplaceShipmentsFilterDto = {
  cargoQuery?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  distanceKmMax?: InputMaybe<Scalars['Int']['input']>;
  routeQuery?: InputMaybe<Scalars['String']['input']>;
  scheduledFrom?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledTo?: InputMaybe<Scalars['DateTime']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  vehicleCategories?: InputMaybe<Array<VehicleCategory>>;
};

export type MarketplaceShipmentsResult = {
  __typename?: 'MarketplaceShipmentsResult';
  items: Array<Shipment>;
  nextCursor?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateRole: Profile;
  addDisputeComment: DisputeEvent;
  addShipmentItem: ShipmentItem;
  approveRefund: Refund;
  awardShipmentBid: ShipmentBidAward;
  cancelShipment: Shipment;
  cancelShipmentAssignment: ShipmentAssignment;
  confirmDropoff: Shipment;
  confirmMarketplaceDropoff: Shipment;
  confirmMarketplacePickup: Shipment;
  confirmPickup: Shipment;
  confirmWalletFunding: WalletFundingResult;
  createDispatchBatch: DispatchBatch;
  createDispute: DisputeCase;
  createInvoice: Invoice;
  createKycUploadUrl: KycUploadUrl;
  createShipment: Shipment;
  createShipmentAssignment: ShipmentAssignment;
  createShipmentBid: ShipmentBid;
  createSlaRule: SlaRule;
  createSupportTicket: SupportTicket;
  createUserAddress: UserAddress;
  createVehicle: Vehicle;
  createWalletFunding: WalletFundingResult;
  createWalletWithdrawal: WalletWithdrawal;
  flagFraudCase: FraudFlag;
  forgotPassword: MessageResponse;
  logout: MessageResponse;
  markEnRoutePickup: Shipment;
  markMarketplaceEnRoutePickup: Shipment;
  refreshToken: AuthResponse;
  replySupportTicket: SupportTicketMessage;
  requestOtp: MessageResponse;
  requestPhoneOtp: MessageResponse;
  resetPassword: MessageResponse;
  resolveDispute: DisputeCase;
  respondToDispatchOffer: DispatchOffer;
  sendDispatchOffer: DispatchOffer;
  setProviderAvailability: Profile;
  signIn: AuthResponse;
  signInWithGoogle: AuthResponse;
  signUp: MessageResponse;
  startNinFaceVerification: ProviderKycCheck;
  startPhoneVerification: ProviderKycCheck;
  startVehiclePlateVerification: ProviderKycCheck;
  startVehicleVinVerification: ProviderKycCheck;
  syncKycStatus: Array<ProviderKycCheck>;
  updateFraudFlagStatus: FraudFlag;
  updateInvoiceStatus: Invoice;
  updateNotificationSettings: NotificationSettings;
  updatePlatformConfig: PlatformConfig;
  updateProfile: Profile;
  updateShipment: Shipment;
  updateShipmentAssignment: ShipmentAssignment;
  updateShipmentBid: ShipmentBid;
  updateSlaRule: SlaRule;
  updateSupportTicketStatus: SupportTicket;
  upsertPushDevice: PushDevice;
  verifyOtp: AuthResponse;
  verifyPhoneOtp: MessageResponse;
  withdrawBid: ShipmentBid;
};


export type MutationActivateRoleArgs = {
  input: ActivateRoleInput;
};


export type MutationAddDisputeCommentArgs = {
  input: AddDisputeCommentDto;
};


export type MutationAddShipmentItemArgs = {
  input: AddShipmentItemDto;
};


export type MutationApproveRefundArgs = {
  input: ApproveRefundDto;
};


export type MutationAwardShipmentBidArgs = {
  input: AwardShipmentBidDto;
};


export type MutationCancelShipmentArgs = {
  input: CancelShipmentDto;
};


export type MutationCancelShipmentAssignmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationConfirmDropoffArgs = {
  shipmentId: Scalars['String']['input'];
};


export type MutationConfirmMarketplaceDropoffArgs = {
  shipmentId: Scalars['String']['input'];
};


export type MutationConfirmMarketplacePickupArgs = {
  shipmentId: Scalars['String']['input'];
};


export type MutationConfirmPickupArgs = {
  shipmentId: Scalars['String']['input'];
};


export type MutationConfirmWalletFundingArgs = {
  input: ConfirmWalletFundingInput;
};


export type MutationCreateDispatchBatchArgs = {
  input: CreateDispatchBatchDto;
};


export type MutationCreateDisputeArgs = {
  input: CreateDisputeDto;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceDto;
};


export type MutationCreateKycUploadUrlArgs = {
  input: CreateKycUploadUrlDto;
};


export type MutationCreateShipmentArgs = {
  input: CreateShipmentDto;
};


export type MutationCreateShipmentAssignmentArgs = {
  input: AssignShipmentDto;
};


export type MutationCreateShipmentBidArgs = {
  input: CreateShipmentBidDto;
};


export type MutationCreateSlaRuleArgs = {
  input: CreateSlaRuleDto;
};


export type MutationCreateSupportTicketArgs = {
  input: CreateSupportTicketDto;
};


export type MutationCreateUserAddressArgs = {
  input: CreateUserAddressDto;
};


export type MutationCreateVehicleArgs = {
  input: CreateVehicleDto;
};


export type MutationCreateWalletFundingArgs = {
  input: CreateWalletFundingInput;
};


export type MutationCreateWalletWithdrawalArgs = {
  input: CreateWalletWithdrawalInput;
};


export type MutationFlagFraudCaseArgs = {
  input: FlagFraudCaseDto;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationMarkEnRoutePickupArgs = {
  shipmentId: Scalars['String']['input'];
};


export type MutationMarkMarketplaceEnRoutePickupArgs = {
  shipmentId: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationReplySupportTicketArgs = {
  input: ReplySupportTicketDto;
};


export type MutationRequestOtpArgs = {
  input: RequestOtpInput;
};


export type MutationRequestPhoneOtpArgs = {
  input: RequestPhoneOtpInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationResolveDisputeArgs = {
  input: ResolveDisputeDto;
};


export type MutationRespondToDispatchOfferArgs = {
  input: UpdateDispatchOfferDto;
};


export type MutationSendDispatchOfferArgs = {
  input: CreateDispatchOfferDto;
};


export type MutationSetProviderAvailabilityArgs = {
  input: SetProviderAvailabilityInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignInWithGoogleArgs = {
  input: SignInWithGoogleInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationStartNinFaceVerificationArgs = {
  input: StartNinFaceVerificationDto;
};


export type MutationStartPhoneVerificationArgs = {
  input: StartPhoneVerificationDto;
};


export type MutationStartVehiclePlateVerificationArgs = {
  input: StartVehiclePlateVerificationDto;
};


export type MutationStartVehicleVinVerificationArgs = {
  input: StartVehicleVinVerificationDto;
};


export type MutationSyncKycStatusArgs = {
  input: SyncKycStatusDto;
};


export type MutationUpdateFraudFlagStatusArgs = {
  input: UpdateFraudFlagStatusDto;
};


export type MutationUpdateInvoiceStatusArgs = {
  input: UpdateInvoiceStatusDto;
};


export type MutationUpdateNotificationSettingsArgs = {
  input: UpdateNotificationSettingsInput;
};


export type MutationUpdatePlatformConfigArgs = {
  input: UpdatePlatformConfigDto;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateShipmentArgs = {
  id: Scalars['String']['input'];
  input: UpdateShipmentDto;
};


export type MutationUpdateShipmentAssignmentArgs = {
  id: Scalars['String']['input'];
  input: AssignShipmentDto;
};


export type MutationUpdateShipmentBidArgs = {
  id: Scalars['String']['input'];
  input: UpdateShipmentBidDto;
};


export type MutationUpdateSlaRuleArgs = {
  input: UpdateSlaRuleDto;
};


export type MutationUpdateSupportTicketStatusArgs = {
  input: UpdateSupportTicketStatusDto;
};


export type MutationUpsertPushDeviceArgs = {
  input: UpsertPushDeviceInput;
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};


export type MutationVerifyPhoneOtpArgs = {
  input: VerifyPhoneOtpInput;
};


export type MutationWithdrawBidArgs = {
  id: Scalars['String']['input'];
};

export type MyKycChecksFilterDto = {
  checkType?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export enum NotificationAudience {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Provider = 'PROVIDER'
}

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  hasActivePushDevice: Scalars['Boolean']['output'];
  lastPushDeviceSeenAt?: Maybe<Scalars['DateTime']['output']>;
  notificationPromptedAt?: Maybe<Scalars['DateTime']['output']>;
  notificationsEnabled: Scalars['Boolean']['output'];
  pushPermissionGranted: Scalars['Boolean']['output'];
  pushPermissionStatus?: Maybe<Scalars['String']['output']>;
};

export type PaymentIntent = {
  __typename?: 'PaymentIntent';
  amountMinor: Scalars['BigInt']['output'];
  authorizationUrl?: Maybe<Scalars['String']['output']>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  paystackReference?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  rawInitResponse?: Maybe<Scalars['JSON']['output']>;
  rawWebhook?: Maybe<Scalars['JSON']['output']>;
  status: PaymentIntentStatus;
  updatedAt: Scalars['DateTime']['output'];
  walletAccountId: Scalars['String']['output'];
};

export enum PaymentIntentStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Initialized = 'INITIALIZED',
  Pending = 'PENDING',
  Succeeded = 'SUCCEEDED'
}

export type Permission = {
  __typename?: 'Permission';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PlatformConfig = {
  __typename?: 'PlatformConfig';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
  value: Scalars['JSON']['output'];
};

export enum PreferredLanguage {
  En = 'EN',
  ZhHans = 'ZH_HANS'
}

export type Profile = {
  __typename?: 'Profile';
  businessName?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  emailVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  notificationPromptedAt?: Maybe<Scalars['DateTime']['output']>;
  notificationsEnabled: Scalars['Boolean']['output'];
  phoneE164?: Maybe<Scalars['String']['output']>;
  phoneVerified: Scalars['Boolean']['output'];
  phoneVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
  preferredLanguage: PreferredLanguage;
  primaryAddress?: Maybe<Scalars['String']['output']>;
  providerAvailabilityUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  providerIsAvailable?: Maybe<Scalars['Boolean']['output']>;
  pushPermissionGranted: Scalars['Boolean']['output'];
  pushPermissionStatus?: Maybe<Scalars['String']['output']>;
  referralCode?: Maybe<Scalars['String']['output']>;
  roles: Array<UserType>;
  state: State;
  status: ProfileStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ProfileStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Suspended = 'SUSPENDED'
}

export type ProviderDashboardQuary = {
  __typename?: 'ProviderDashboardQuary';
  activeAssignments: Array<Shipment>;
  cancelledShipmentsCount: Scalars['Int']['output'];
  completedShipments: Array<Shipment>;
  completionRate: Scalars['Float']['output'];
  dispatchStats: ProviderDispatchStats;
  earningsSummary: ProviderEarningsSummary;
  kycStatus?: Maybe<ProviderKycStatus>;
  myShipmentDashboard: ShipmentDashboard;
  myWallet?: Maybe<WalletAccount>;
  performance: ProviderPerformance;
  vehicles: Array<Vehicle>;
};

export type ProviderDispatchStats = {
  __typename?: 'ProviderDispatchStats';
  acceptanceRate: Scalars['Float']['output'];
  offersAccepted: Scalars['Int']['output'];
  offersDeclined: Scalars['Int']['output'];
  offersExpired: Scalars['Int']['output'];
  offersReceived: Scalars['Int']['output'];
};

export type ProviderEarningsSummary = {
  __typename?: 'ProviderEarningsSummary';
  currency: Scalars['String']['output'];
  earningsThisMonthMinor: Scalars['BigInt']['output'];
  totalEarningsMinor: Scalars['BigInt']['output'];
};

export type ProviderKycCheck = {
  __typename?: 'ProviderKycCheck';
  checkType: Scalars['String']['output'];
  confidence?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  failedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  initiatedByProfileId?: Maybe<Scalars['String']['output']>;
  maskedIdentifier?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  normalizedData?: Maybe<Scalars['JSON']['output']>;
  profileId?: Maybe<Scalars['String']['output']>;
  providerId: Scalars['String']['output'];
  responseCode?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vehicleId?: Maybe<Scalars['String']['output']>;
  vendor: Scalars['String']['output'];
  vendorReference?: Maybe<Scalars['String']['output']>;
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProviderKycStatus = {
  __typename?: 'ProviderKycStatus';
  createdAt: Scalars['DateTime']['output'];
  faceConfidence?: Maybe<Scalars['Float']['output']>;
  faceStatus: Scalars['String']['output'];
  faceVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
  failureSummary?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kycLevel: Scalars['Int']['output'];
  lastCheckAt?: Maybe<Scalars['DateTime']['output']>;
  lastVendorSyncAt?: Maybe<Scalars['DateTime']['output']>;
  maskedNin?: Maybe<Scalars['String']['output']>;
  maskedPhone?: Maybe<Scalars['String']['output']>;
  ninStatus: Scalars['String']['output'];
  ninVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
  overallStatus: Scalars['String']['output'];
  phoneStatus: Scalars['String']['output'];
  phoneVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
  providerId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vehiclePlateStatus: Scalars['String']['output'];
  vehiclePlateVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
  vehicleVinStatus: Scalars['String']['output'];
  vehicleVinVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProviderPerformance = {
  __typename?: 'ProviderPerformance';
  isAvailable: Scalars['Boolean']['output'];
  penaltiesCount: Scalars['Int']['output'];
  penaltyPoints: Scalars['Int']['output'];
  priorityScore: Scalars['Int']['output'];
  ratingAvg: Scalars['Float']['output'];
  ratingCount: Scalars['Int']['output'];
  teamMembersCount: Scalars['Int']['output'];
};

export type PushDevice = {
  __typename?: 'PushDevice';
  appVersion?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deviceId?: Maybe<Scalars['String']['output']>;
  expoPushToken: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastSeenAt: Scalars['DateTime']['output'];
  platform?: Maybe<Scalars['String']['output']>;
  profileId: Scalars['String']['output'];
  pushPermissionStatus?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminConfig: Array<PlatformConfig>;
  adminDashboard: AdminDashboard;
  adminDispatchQueue: Array<DispatchBatch>;
  adminDisputes: Array<DisputeCase>;
  adminFinanceSummary: AdminFinanceSummary;
  adminFraudFlags: Array<FraudFlag>;
  adminLiveShipments: Array<Shipment>;
  adminMarketplaceBoard: Array<Shipment>;
  adminOverview: AdminOverview;
  adminProviderKyc?: Maybe<ProviderKycStatus>;
  adminProviderKycChecks: Array<ProviderKycCheck>;
  adminProviders: Array<AdminProviderOverview>;
  adminSlaRules: Array<SlaRule>;
  allowedShipmentCurrencies: Array<Scalars['String']['output']>;
  currentAddress?: Maybe<ResolvedAddress>;
  dispatchBatches: Array<DispatchBatch>;
  dispute?: Maybe<DisputeCase>;
  freightRequestBids: Array<ShipmentBid>;
  getProviderDashboardQuary: ProviderDashboardQuary;
  invoice?: Maybe<Invoice>;
  marketplaceShipments: MarketplaceShipmentsResult;
  me?: Maybe<Profile>;
  myBids: Array<ShipmentBid>;
  myDispatchOffers: Array<DispatchOffer>;
  myDisputes: Array<DisputeCase>;
  myFreightRequests: Array<Shipment>;
  myInvoices: Array<Invoice>;
  myKycChecks: Array<ProviderKycCheck>;
  myKycStatus?: Maybe<ProviderKycStatus>;
  myNotificationSettings: NotificationSettings;
  mySavedFundingCards: Array<WalletCardMethod>;
  mySavedWithdrawalAccounts: Array<WalletSavedBankAccount>;
  myShipmentDashboard: ShipmentDashboard;
  mySupportTickets: Array<SupportTicket>;
  myUserAddresses: Array<UserAddress>;
  myVehicles: Array<Vehicle>;
  myWallet?: Maybe<WalletAccount>;
  myWalletCompliance: WalletCompliance;
  myWalletTransactions: WalletTransactionsConnection;
  paystackSupportedBanks: Array<WalletBank>;
  providerDashboard: ProviderDashboardQuary;
  searchAddresses: Array<AddressSuggestion>;
  shipment?: Maybe<Shipment>;
  shipmentBids: Array<ShipmentBid>;
  shipmentTimeline: Array<ShipmentEvent>;
  shipmentTracking: ShipmentTracking;
  shipments: Array<Shipment>;
  supportTicket?: Maybe<SupportTicket>;
  walletTransactions: Array<Transaction>;
};


export type QueryAdminDashboardArgs = {
  input?: InputMaybe<AdminDashboardFilterDto>;
};


export type QueryAdminProviderKycArgs = {
  providerId: Scalars['String']['input'];
};


export type QueryAdminProviderKycChecksArgs = {
  providerId: Scalars['String']['input'];
};


export type QueryCurrentAddressArgs = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};


export type QueryDisputeArgs = {
  id: Scalars['String']['input'];
};


export type QueryFreightRequestBidsArgs = {
  shipmentId: Scalars['String']['input'];
};


export type QueryInvoiceArgs = {
  id: Scalars['String']['input'];
};


export type QueryMarketplaceShipmentsArgs = {
  filter?: InputMaybe<MarketplaceShipmentsFilterDto>;
};


export type QueryMyKycChecksArgs = {
  filter?: InputMaybe<MyKycChecksFilterDto>;
};


export type QueryMyWalletTransactionsArgs = {
  input?: InputMaybe<WalletTransactionsInput>;
};


export type QueryPaystackSupportedBanksArgs = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchAddressesArgs = {
  input: SearchAddressInput;
};


export type QueryShipmentArgs = {
  id: Scalars['String']['input'];
};


export type QueryShipmentBidsArgs = {
  shipmentId: Scalars['String']['input'];
};


export type QueryShipmentTimelineArgs = {
  id: Scalars['String']['input'];
};


export type QueryShipmentTrackingArgs = {
  id: Scalars['String']['input'];
};


export type QueryShipmentsArgs = {
  filter?: InputMaybe<ShipmentQueryFilter>;
};


export type QuerySupportTicketArgs = {
  id: Scalars['String']['input'];
};


export type QueryWalletTransactionsArgs = {
  walletAccountId: Scalars['String']['input'];
};

export type Refund = {
  __typename?: 'Refund';
  amountMinor: Scalars['BigInt']['output'];
  approvedAt?: Maybe<Scalars['DateTime']['output']>;
  approvedByProfileId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  initiatedByProfileId: Scalars['String']['output'];
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  shipmentId: Scalars['String']['output'];
  status: RefundStatus;
  transactionId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum RefundStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Succeeded = 'SUCCEEDED'
}

export type ReplySupportTicketDto = {
  message: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
};

export type RequestOtpInput = {
  email: Scalars['String']['input'];
  mode: Scalars['String']['input'];
};

export type RequestPhoneOtpInput = {
  phoneE164: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResolveDisputeDto = {
  disputeId: Scalars['String']['input'];
  resolutionSummary: Scalars['String']['input'];
  status?: InputMaybe<DisputeStatus>;
};

export type ResolvedAddress = {
  __typename?: 'ResolvedAddress';
  addressLine?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  formattedAddress: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  placeId?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  stateOrProvince?: Maybe<Scalars['String']['output']>;
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  rolePermissions: Array<RolePermission>;
  updatedAt: Scalars['DateTime']['output'];
};

export type RolePermission = {
  __typename?: 'RolePermission';
  createdAt: Scalars['DateTime']['output'];
  permission: Permission;
  permissionId: Scalars['String']['output'];
  roleId: Scalars['String']['output'];
};

export type SlaRule = {
  __typename?: 'SLARule';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  providerId?: Maybe<Scalars['String']['output']>;
  scope: SlaRuleScope;
  value: Scalars['JSON']['output'];
  vehicleCategory?: Maybe<Scalars['String']['output']>;
};

export type SearchAddressInput = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  sessionToken?: InputMaybe<Scalars['String']['input']>;
};

export type SetProviderAvailabilityInput = {
  isAvailable: Scalars['Boolean']['input'];
};

export type Shipment = {
  __typename?: 'Shipment';
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  cancelledByProfileId?: Maybe<Scalars['String']['output']>;
  commissionAmountMinor: Scalars['BigInt']['output'];
  commissionRateBps: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerProfileId: Scalars['String']['output'];
  dropoffAddress?: Maybe<UserAddress>;
  dropoffAddressId: Scalars['String']['output'];
  dropoffAddressSummary?: Maybe<Scalars['String']['output']>;
  finalPriceMinor?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<ShipmentItem>>;
  mode: ShipmentMode;
  packageDescription?: Maybe<Scalars['String']['output']>;
  packageValueMinor?: Maybe<Scalars['BigInt']['output']>;
  pickupAddress?: Maybe<UserAddress>;
  pickupAddressId: Scalars['String']['output'];
  pickupAddressSummary?: Maybe<Scalars['String']['output']>;
  pricingCurrency: Scalars['String']['output'];
  quotedPriceMinor?: Maybe<Scalars['BigInt']['output']>;
  requiresEscrow: Scalars['Boolean']['output'];
  scheduleType: ShipmentScheduleType;
  scheduledAt?: Maybe<Scalars['DateTime']['output']>;
  specialInstructions?: Maybe<Scalars['String']['output']>;
  status: ShipmentStatus;
  trackingCode: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vehicleCategory: VehicleCategory;
};

export enum ShipmentActorRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Provider = 'PROVIDER',
  System = 'SYSTEM'
}

export type ShipmentAssignment = {
  __typename?: 'ShipmentAssignment';
  agreedPriceMinor?: Maybe<Scalars['BigInt']['output']>;
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  dispatchOfferId?: Maybe<Scalars['String']['output']>;
  driverProfileId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  providerId: Scalars['String']['output'];
  shipmentId: Scalars['String']['output'];
  status: ShipmentAssignmentStatus;
  updatedAt: Scalars['DateTime']['output'];
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export enum ShipmentAssignmentStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED'
}

export type ShipmentBid = {
  __typename?: 'ShipmentBid';
  amountMinor: Scalars['BigInt']['output'];
  award?: Maybe<ShipmentBidAward>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  providerId: Scalars['String']['output'];
  shipment?: Maybe<Shipment>;
  shipmentId: Scalars['String']['output'];
  status: BidStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type ShipmentBidAward = {
  __typename?: 'ShipmentBidAward';
  awardedAt: Scalars['DateTime']['output'];
  awardedByProfileId: Scalars['String']['output'];
  bidId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  shipmentId: Scalars['String']['output'];
};

export type ShipmentDashboard = {
  __typename?: 'ShipmentDashboard';
  recentShipments: Array<ShipmentDashboardRecentShipment>;
  summary: ShipmentDashboardSummary;
};

export type ShipmentDashboardRecentShipment = {
  __typename?: 'ShipmentDashboardRecentShipment';
  createdAt: Scalars['DateTime']['output'];
  dropoffAddressSummary?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  mode: ShipmentMode;
  pickupAddressSummary?: Maybe<Scalars['String']['output']>;
  scheduledAt?: Maybe<Scalars['DateTime']['output']>;
  status: ShipmentStatus;
  trackingCode: Scalars['String']['output'];
};

export type ShipmentDashboardSummary = {
  __typename?: 'ShipmentDashboardSummary';
  activeShipments: Scalars['Int']['output'];
  completedThisMonth: Scalars['Int']['output'];
  pendingPaymentAmountMinor: Scalars['BigInt']['output'];
  pendingPaymentCount: Scalars['Int']['output'];
  pendingPaymentCurrency: Scalars['String']['output'];
  totalShipments: Scalars['Int']['output'];
};

export type ShipmentEvent = {
  __typename?: 'ShipmentEvent';
  actorProfileId?: Maybe<Scalars['String']['output']>;
  actorRole?: Maybe<ShipmentActorRole>;
  createdAt: Scalars['DateTime']['output'];
  eventType: ShipmentEventType;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  shipmentId: Scalars['String']['output'];
};

export enum ShipmentEventType {
  Accepted = 'ACCEPTED',
  Assigned = 'ASSIGNED',
  BidPlaced = 'BID_PLACED',
  Broadcasted = 'BROADCASTED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  PickedUp = 'PICKED_UP'
}

export type ShipmentItem = {
  __typename?: 'ShipmentItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  shipmentId: Scalars['String']['output'];
  weightKg?: Maybe<Scalars['Float']['output']>;
};

export type ShipmentMilestone = {
  __typename?: 'ShipmentMilestone';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  milestoneType: ShipmentMilestoneType;
  occurredAt?: Maybe<Scalars['DateTime']['output']>;
  shipmentId: Scalars['String']['output'];
  status: ShipmentMilestoneStatus;
};

export enum ShipmentMilestoneStatus {
  Pending = 'PENDING',
  Reached = 'REACHED',
  Verified = 'VERIFIED'
}

export enum ShipmentMilestoneType {
  Accepted = 'ACCEPTED',
  ArrivedDropoff = 'ARRIVED_DROPOFF',
  ArrivedPickup = 'ARRIVED_PICKUP',
  Completed = 'COMPLETED',
  Delivered = 'DELIVERED',
  PickedUp = 'PICKED_UP'
}

export enum ShipmentMode {
  Dispatch = 'DISPATCH',
  Marketplace = 'MARKETPLACE'
}

export enum ShipmentQueryFilter {
  Active = 'ACTIVE',
  History = 'HISTORY',
  Scheduled = 'SCHEDULED'
}

export enum ShipmentScheduleType {
  Instant = 'INSTANT',
  Scheduled = 'SCHEDULED'
}

export enum ShipmentStatus {
  Assigned = 'ASSIGNED',
  Broadcasting = 'BROADCASTING',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  EnRouteDropoff = 'EN_ROUTE_DROPOFF',
  EnRoutePickup = 'EN_ROUTE_PICKUP',
  Expired = 'EXPIRED',
  PickedUp = 'PICKED_UP'
}

export type ShipmentTracking = {
  __typename?: 'ShipmentTracking';
  events: Array<ShipmentEvent>;
  milestones: Array<ShipmentMilestone>;
  shipment: Shipment;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInWithGoogleInput = {
  idToken: Scalars['String']['input'];
};

export type SignUpInput = {
  businessAddress?: InputMaybe<Scalars['String']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  referralCode?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<UserType>>;
  state: State;
};

export enum SlaRuleScope {
  Global = 'GLOBAL',
  Provider = 'PROVIDER',
  VehicleCategory = 'VEHICLE_CATEGORY'
}

export type StartNinFaceVerificationDto = {
  dateOfBirth: Scalars['String']['input'];
  faceMediaId: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  numberNin: Scalars['String']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
};

export type StartPhoneVerificationDto = {
  phoneNumber: Scalars['String']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
};

export type StartVehiclePlateVerificationDto = {
  plateNumber?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['String']['input']>;
};

export type StartVehicleVinVerificationDto = {
  providerId?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['String']['input']>;
  vin?: InputMaybe<Scalars['String']['input']>;
};

export enum State {
  Abuja = 'ABUJA',
  Lagos = 'LAGOS',
  Oyo = 'OYO'
}

export type Subscription = {
  __typename?: 'Subscription';
  dispatchOfferSent: DispatchOffer;
};

export type SupportTicket = {
  __typename?: 'SupportTicket';
  assignedAdminProfileId?: Maybe<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<SupportTicketMessage>>;
  ownerProfileId: Scalars['String']['output'];
  priority: SupportTicketPriority;
  referenceId?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  status: SupportTicketStatus;
  subject: Scalars['String']['output'];
  ticketNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SupportTicketMessage = {
  __typename?: 'SupportTicketMessage';
  authorProfileId?: Maybe<Scalars['String']['output']>;
  authorRole: ShipmentActorRole;
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  ticketId: Scalars['String']['output'];
};

export enum SupportTicketPriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum SupportTicketStatus {
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export type SyncKycStatusDto = {
  checkId?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  vendorReference?: InputMaybe<Scalars['String']['input']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amountMinor: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  direction: TransactionDirection;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  paymentIntentId?: Maybe<Scalars['String']['output']>;
  reference: Scalars['String']['output'];
  shipmentId?: Maybe<Scalars['String']['output']>;
  status: TransactionStatus;
  transactionType: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  walletAccountId: Scalars['String']['output'];
};

export enum TransactionDirection {
  Credit = 'CREDIT',
  Debit = 'DEBIT'
}

export enum TransactionStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Reversed = 'REVERSED'
}

export enum TransactionType {
  Adjustment = 'ADJUSTMENT',
  Commission = 'COMMISSION',
  ProviderPayout = 'PROVIDER_PAYOUT',
  Refund = 'REFUND',
  ShipmentPayment = 'SHIPMENT_PAYMENT',
  Topup = 'TOPUP',
  Withdrawal = 'WITHDRAWAL'
}

export type UpdateDispatchOfferDto = {
  offerId: Scalars['String']['input'];
  providerEtaMinutes?: InputMaybe<Scalars['Float']['input']>;
  respondedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status: DispatchOfferStatus;
};

export type UpdateFraudFlagStatusDto = {
  fraudFlagId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  status: FraudStatus;
};

export type UpdateInvoiceStatusDto = {
  invoiceId: Scalars['String']['input'];
  status: InvoiceStatus;
};

export type UpdateNotificationSettingsInput = {
  markPrompted?: InputMaybe<Scalars['Boolean']['input']>;
  notificationsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  pushPermissionGranted?: InputMaybe<Scalars['Boolean']['input']>;
  pushPermissionStatus?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlatformConfigDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  value: Scalars['JSON']['input'];
};

export type UpdateProfileInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneE164?: InputMaybe<Scalars['String']['input']>;
  preferredLanguage?: InputMaybe<PreferredLanguage>;
  status?: InputMaybe<ProfileStatus>;
};

export type UpdateShipmentBidDto = {
  amountMinor?: InputMaybe<Scalars['BigInt']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BidStatus>;
};

export type UpdateShipmentDto = {
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
  cancelledAt?: InputMaybe<Scalars['DateTime']['input']>;
  cancelledByProfileId?: InputMaybe<Scalars['String']['input']>;
  commissionAmountMinor?: InputMaybe<Scalars['BigInt']['input']>;
  commissionRateBps?: InputMaybe<Scalars['Float']['input']>;
  customerProfileId?: InputMaybe<Scalars['String']['input']>;
  dropoffAddressId?: InputMaybe<Scalars['String']['input']>;
  finalPriceMinor?: InputMaybe<Scalars['BigInt']['input']>;
  mode?: InputMaybe<ShipmentMode>;
  packageDescription?: InputMaybe<Scalars['String']['input']>;
  packageValueMinor?: InputMaybe<Scalars['BigInt']['input']>;
  pickupAddressId?: InputMaybe<Scalars['String']['input']>;
  pricingCurrency?: InputMaybe<Scalars['String']['input']>;
  quotedPriceMinor?: InputMaybe<Scalars['BigInt']['input']>;
  requiresEscrow?: InputMaybe<Scalars['Boolean']['input']>;
  scheduleType?: InputMaybe<ShipmentScheduleType>;
  scheduledAt?: InputMaybe<Scalars['DateTime']['input']>;
  specialInstructions?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentStatus>;
  trackingCode?: InputMaybe<Scalars['String']['input']>;
  vehicleCategory?: InputMaybe<VehicleCategory>;
};

export type UpdateSlaRuleDto = {
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateSupportTicketStatusDto = {
  status: SupportTicketStatus;
  ticketId: Scalars['String']['input'];
};

export type UpsertPushDeviceInput = {
  appVersion?: InputMaybe<Scalars['String']['input']>;
  deviceId?: InputMaybe<Scalars['String']['input']>;
  expoPushToken: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  pushPermissionStatus?: InputMaybe<Scalars['String']['input']>;
};

export type UserAddress = {
  __typename?: 'UserAddress';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  postalCode: Scalars['String']['output'];
  profileId: Scalars['String']['output'];
  state: State;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserType {
  Admin = 'ADMIN',
  Business = 'BUSINESS',
  Individual = 'INDIVIDUAL'
}

export type Vehicle = {
  __typename?: 'Vehicle';
  capacityKg?: Maybe<Scalars['Int']['output']>;
  capacityVolumeCm3?: Maybe<Scalars['BigInt']['output']>;
  category: VehicleCategory;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastVerificationAt?: Maybe<Scalars['DateTime']['output']>;
  make?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  plateNumber?: Maybe<Scalars['String']['output']>;
  plateVerificationStatus?: Maybe<Scalars['String']['output']>;
  providerId: Scalars['String']['output'];
  status: VehicleStatus;
  updatedAt: Scalars['DateTime']['output'];
  verificationFailureReason?: Maybe<Scalars['String']['output']>;
  vin?: Maybe<Scalars['String']['output']>;
  vinVerificationStatus?: Maybe<Scalars['String']['output']>;
};

export enum VehicleCategory {
  Bike = 'BIKE',
  Truck = 'TRUCK',
  Van = 'VAN'
}

export enum VehicleStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Maintenance = 'MAINTENANCE'
}

export type VerifyOtpInput = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type VerifyPhoneOtpInput = {
  phoneE164: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type WalletAccount = {
  __typename?: 'WalletAccount';
  balanceMinor: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  escrowMinor: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  ownerProfileId?: Maybe<Scalars['String']['output']>;
  status: WalletAccountStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum WalletAccountStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Suspended = 'SUSPENDED'
}

export type WalletBank = {
  __typename?: 'WalletBank';
  active?: Maybe<Scalars['Boolean']['output']>;
  code: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  gateway?: Maybe<Scalars['String']['output']>;
  longcode?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  payWithBank?: Maybe<Scalars['Boolean']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type WalletCardMethod = {
  __typename?: 'WalletCardMethod';
  bank?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  cardType?: Maybe<Scalars['String']['output']>;
  channel?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customerCode?: Maybe<Scalars['String']['output']>;
  expMonth?: Maybe<Scalars['String']['output']>;
  expYear?: Maybe<Scalars['String']['output']>;
  first6?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  last4?: Maybe<Scalars['String']['output']>;
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  profileId: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  reusable: Scalars['Boolean']['output'];
  signature?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  walletAccountId: Scalars['String']['output'];
};

export type WalletCompliance = {
  __typename?: 'WalletCompliance';
  blockReasons: Array<Scalars['String']['output']>;
  canFund: Scalars['Boolean']['output'];
  canWithdraw: Scalars['Boolean']['output'];
  phoneVerified: Scalars['Boolean']['output'];
};

export type WalletFundingResult = {
  __typename?: 'WalletFundingResult';
  authorizationUrl?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  paymentIntent?: Maybe<PaymentIntent>;
  reference: Scalars['String']['output'];
  status: PaymentIntentStatus;
  success: Scalars['Boolean']['output'];
  walletTransaction?: Maybe<Transaction>;
};

export type WalletSavedBankAccount = {
  __typename?: 'WalletSavedBankAccount';
  accountName: Scalars['String']['output'];
  accountNumberMasked: Scalars['String']['output'];
  bankCode: Scalars['String']['output'];
  bankName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  profileId: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  recipientCode: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  walletAccountId: Scalars['String']['output'];
};

export type WalletTransactionsConnection = {
  __typename?: 'WalletTransactionsConnection';
  hasMore: Scalars['Boolean']['output'];
  items: Array<Transaction>;
  nextCursor?: Maybe<Scalars['String']['output']>;
};

export type WalletTransactionsInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<TransactionDirection>;
  status?: InputMaybe<TransactionStatus>;
  take?: InputMaybe<Scalars['Int']['input']>;
  transactionType?: InputMaybe<TransactionType>;
};

export type WalletWithdrawal = {
  __typename?: 'WalletWithdrawal';
  accountName?: Maybe<Scalars['String']['output']>;
  accountNumberMasked?: Maybe<Scalars['String']['output']>;
  amountMinor: Scalars['BigInt']['output'];
  bankCode?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  failedAt?: Maybe<Scalars['DateTime']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paystackTransferId?: Maybe<Scalars['String']['output']>;
  profileId: Scalars['String']['output'];
  rawInitResponse?: Maybe<Scalars['JSON']['output']>;
  rawWebhook?: Maybe<Scalars['JSON']['output']>;
  recipientCode?: Maybe<Scalars['String']['output']>;
  reference: Scalars['String']['output'];
  relatedTransactionId?: Maybe<Scalars['String']['output']>;
  savedBankAccountId?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  transferCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  walletAccountId: Scalars['String']['output'];
};

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'MessageResponse', message: string, success: boolean } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'Profile', id: string, email: string, emailVerified: boolean, emailVerifiedAt?: any | null, roles: Array<UserType>, firstName?: string | null, lastName?: string | null, phoneE164?: string | null, phoneVerified: boolean, phoneVerifiedAt?: any | null, notificationsEnabled: boolean, notificationPromptedAt?: any | null, pushPermissionGranted: boolean, pushPermissionStatus?: string | null, state: State, referralCode?: string | null, preferredLanguage: PreferredLanguage, status: ProfileStatus, lastLoginAt?: any | null, createdAt: any, updatedAt: any } } };

export type RequestOtpMutationVariables = Exact<{
  input: RequestOtpInput;
}>;


export type RequestOtpMutation = { __typename?: 'Mutation', requestOtp: { __typename?: 'MessageResponse', message: string, success: boolean } };

export type RequestPhoneOtpMutationVariables = Exact<{
  input: RequestPhoneOtpInput;
}>;


export type RequestPhoneOtpMutation = { __typename?: 'Mutation', requestPhoneOtp: { __typename?: 'MessageResponse', message: string, success: boolean } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'MessageResponse', message: string, success: boolean } };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'Profile', id: string, email: string, emailVerified: boolean, emailVerifiedAt?: any | null, roles: Array<UserType>, firstName?: string | null, lastName?: string | null, phoneE164?: string | null, phoneVerified: boolean, phoneVerifiedAt?: any | null, notificationsEnabled: boolean, notificationPromptedAt?: any | null, pushPermissionGranted: boolean, pushPermissionStatus?: string | null, state: State, referralCode?: string | null, preferredLanguage: PreferredLanguage, status: ProfileStatus, lastLoginAt?: any | null, createdAt: any, updatedAt: any } } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'MessageResponse', message: string, success: boolean } };

export type VerifyOtpMutationVariables = Exact<{
  input: VerifyOtpInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'Profile', id: string, email: string, emailVerified: boolean, emailVerifiedAt?: any | null, roles: Array<UserType>, firstName?: string | null, lastName?: string | null, phoneE164?: string | null, phoneVerified: boolean, phoneVerifiedAt?: any | null, notificationsEnabled: boolean, notificationPromptedAt?: any | null, pushPermissionGranted: boolean, pushPermissionStatus?: string | null, state: State, referralCode?: string | null, preferredLanguage: PreferredLanguage, status: ProfileStatus, lastLoginAt?: any | null, createdAt: any, updatedAt: any } } };

export type VerifyPhoneOtpMutationVariables = Exact<{
  input: VerifyPhoneOtpInput;
}>;


export type VerifyPhoneOtpMutation = { __typename?: 'Mutation', verifyPhoneOtp: { __typename?: 'MessageResponse', message: string, success: boolean } };

export type ConfirmDropoffMutationVariables = Exact<{
  shipmentId: Scalars['String']['input'];
}>;


export type ConfirmDropoffMutation = { __typename?: 'Mutation', confirmDropoff: { __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, createdAt: any, updatedAt: any } };

export type ConfirmPickupMutationVariables = Exact<{
  shipmentId: Scalars['String']['input'];
}>;


export type ConfirmPickupMutation = { __typename?: 'Mutation', confirmPickup: { __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, createdAt: any, updatedAt: any } };

export type MarkEnRoutePickupMutationVariables = Exact<{
  shipmentId: Scalars['String']['input'];
}>;


export type MarkEnRoutePickupMutation = { __typename?: 'Mutation', markEnRoutePickup: { __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, createdAt: any, updatedAt: any } };

export type RespondToDispatchOfferMutationVariables = Exact<{
  input: UpdateDispatchOfferDto;
}>;


export type RespondToDispatchOfferMutation = { __typename?: 'Mutation', respondToDispatchOffer: { __typename?: 'DispatchOffer', id: string, batchId: string, providerId: string, shipmentId: string, vehicleId?: string | null, status: DispatchOfferStatus, sentAt?: any | null, respondedAt?: any | null, expiresAt?: any | null, providerEtaMinutes?: number | null, createdAt: any, updatedAt: any } };

export type ConfirmMarketplaceDropoffMutationVariables = Exact<{
  shipmentId: Scalars['String']['input'];
}>;


export type ConfirmMarketplaceDropoffMutation = { __typename?: 'Mutation', confirmMarketplaceDropoff: { __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, createdAt: any, updatedAt: any } };

export type ConfirmMarketplacePickupMutationVariables = Exact<{
  shipmentId: Scalars['String']['input'];
}>;


export type ConfirmMarketplacePickupMutation = { __typename?: 'Mutation', confirmMarketplacePickup: { __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, createdAt: any, updatedAt: any } };

export type CreateShipmentBidMutationVariables = Exact<{
  input: CreateShipmentBidDto;
}>;


export type CreateShipmentBidMutation = { __typename?: 'Mutation', createShipmentBid: { __typename?: 'ShipmentBid', id: string, shipmentId: string, providerId: string, amountMinor: any, currency: string, message?: string | null, status: BidStatus, createdAt: any, updatedAt: any } };

export type MarkMarketplaceEnRoutePickupMutationVariables = Exact<{
  shipmentId: Scalars['String']['input'];
}>;


export type MarkMarketplaceEnRoutePickupMutation = { __typename?: 'Mutation', markMarketplaceEnRoutePickup: { __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, createdAt: any, updatedAt: any } };

export type WithdrawBidMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type WithdrawBidMutation = { __typename?: 'Mutation', withdrawBid: { __typename?: 'ShipmentBid', id: string, shipmentId: string, providerId: string, amountMinor: any, currency: string, message?: string | null, status: BidStatus, createdAt: any, updatedAt: any } };

export type CreateKycUploadUrlMutationVariables = Exact<{
  input: CreateKycUploadUrlDto;
}>;


export type CreateKycUploadUrlMutation = { __typename?: 'Mutation', createKycUploadUrl: { __typename?: 'KycUploadUrl', mediaId: string, storageBucket: string, storagePath: string, uploadUrl: string, expiresAt: any } };

export type CreateVehicleMutationVariables = Exact<{
  input: CreateVehicleDto;
}>;


export type CreateVehicleMutation = { __typename?: 'Mutation', createVehicle: { __typename?: 'Vehicle', id: string, providerId: string, category: VehicleCategory, plateNumber?: string | null, vin?: string | null, make?: string | null, model?: string | null, color?: string | null, capacityKg?: number | null, capacityVolumeCm3?: any | null, plateVerificationStatus?: string | null, vinVerificationStatus?: string | null, lastVerificationAt?: any | null, verificationFailureReason?: string | null, status: VehicleStatus, createdAt: any, updatedAt: any } };

export type StartNinFaceVerificationMutationVariables = Exact<{
  input: StartNinFaceVerificationDto;
}>;


export type StartNinFaceVerificationMutation = { __typename?: 'Mutation', startNinFaceVerification: { __typename?: 'ProviderKycCheck', id: string, checkType: string, status: string, vendor: string, vendorReference?: string | null, responseCode?: string | null, confidence?: number | null, message?: string | null, maskedIdentifier?: string | null, createdAt: any, verifiedAt?: any | null, failedAt?: any | null } };

export type StartPhoneVerificationMutationVariables = Exact<{
  input: StartPhoneVerificationDto;
}>;


export type StartPhoneVerificationMutation = { __typename?: 'Mutation', startPhoneVerification: { __typename?: 'ProviderKycCheck', id: string, checkType: string, status: string, vendorReference?: string | null, responseCode?: string | null, message?: string | null, maskedIdentifier?: string | null, createdAt: any, verifiedAt?: any | null, failedAt?: any | null } };

export type StartVehiclePlateVerificationMutationVariables = Exact<{
  input: StartVehiclePlateVerificationDto;
}>;


export type StartVehiclePlateVerificationMutation = { __typename?: 'Mutation', startVehiclePlateVerification: { __typename?: 'ProviderKycCheck', id: string, checkType: string, status: string, vendorReference?: string | null, responseCode?: string | null, message?: string | null, maskedIdentifier?: string | null, createdAt: any, verifiedAt?: any | null, failedAt?: any | null } };

export type StartVehicleVinVerificationMutationVariables = Exact<{
  input: StartVehicleVinVerificationDto;
}>;


export type StartVehicleVinVerificationMutation = { __typename?: 'Mutation', startVehicleVinVerification: { __typename?: 'ProviderKycCheck', id: string, checkType: string, status: string, vendorReference?: string | null, responseCode?: string | null, message?: string | null, maskedIdentifier?: string | null, createdAt: any, verifiedAt?: any | null, failedAt?: any | null } };

export type SyncKycStatusMutationVariables = Exact<{
  input: SyncKycStatusDto;
}>;


export type SyncKycStatusMutation = { __typename?: 'Mutation', syncKycStatus: Array<{ __typename?: 'ProviderKycCheck', id: string, checkType: string, status: string, vendorReference?: string | null, responseCode?: string | null, message?: string | null, maskedIdentifier?: string | null, createdAt: any, verifiedAt?: any | null, failedAt?: any | null }> };

export type AddShipmentItemMutationVariables = Exact<{
  input: AddShipmentItemDto;
}>;


export type AddShipmentItemMutation = { __typename?: 'Mutation', addShipmentItem: { __typename?: 'ShipmentItem', id: string, shipmentId: string, name: string, quantity: number, weightKg?: number | null, createdAt: any } };

export type CancelShipmentMutationVariables = Exact<{
  input: CancelShipmentDto;
}>;


export type CancelShipmentMutation = { __typename?: 'Mutation', cancelShipment: { __typename?: 'Shipment', id: string, trackingCode: string, customerProfileId: string, mode: ShipmentMode, vehicleCategory: VehicleCategory, scheduleType: ShipmentScheduleType, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, scheduledAt?: any | null, packageDescription?: string | null, packageValueMinor?: any | null, specialInstructions?: string | null, requiresEscrow: boolean, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, commissionRateBps: number, commissionAmountMinor: any, createdAt: any, updatedAt: any, cancelledAt?: any | null, cancelledByProfileId?: string | null, cancellationReason?: string | null } };

export type CreateShipmentMutationVariables = Exact<{
  input: CreateShipmentDto;
}>;


export type CreateShipmentMutation = { __typename?: 'Mutation', createShipment: { __typename?: 'Shipment', id: string, trackingCode: string, customerProfileId: string, mode: ShipmentMode, vehicleCategory: VehicleCategory, scheduleType: ShipmentScheduleType, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, scheduledAt?: any | null, packageDescription?: string | null, packageValueMinor?: any | null, specialInstructions?: string | null, requiresEscrow: boolean, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, commissionRateBps: number, commissionAmountMinor: any, createdAt: any, updatedAt: any, cancelledAt?: any | null, cancelledByProfileId?: string | null, cancellationReason?: string | null } };

export type CreateUserAddressMutationVariables = Exact<{
  input: CreateUserAddressDto;
}>;


export type CreateUserAddressMutation = { __typename?: 'Mutation', createUserAddress: { __typename?: 'UserAddress', id: string, profileId: string, address: string, city: string, state: State, postalCode: string, label?: string | null, countryCode: string, lat?: number | null, lng?: number | null, createdAt: any, updatedAt: any } };

export type UpdateShipmentMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateShipmentDto;
}>;


export type UpdateShipmentMutation = { __typename?: 'Mutation', updateShipment: { __typename?: 'Shipment', id: string, trackingCode: string, customerProfileId: string, mode: ShipmentMode, vehicleCategory: VehicleCategory, scheduleType: ShipmentScheduleType, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, scheduledAt?: any | null, packageDescription?: string | null, packageValueMinor?: any | null, specialInstructions?: string | null, requiresEscrow: boolean, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, commissionRateBps: number, commissionAmountMinor: any, createdAt: any, updatedAt: any, cancelledAt?: any | null, cancelledByProfileId?: string | null, cancellationReason?: string | null } };

export type SetProviderAvailabilityMutationVariables = Exact<{
  input: SetProviderAvailabilityInput;
}>;


export type SetProviderAvailabilityMutation = { __typename?: 'Mutation', setProviderAvailability: { __typename?: 'Profile', id: string, email: string, emailVerified: boolean, emailVerifiedAt?: any | null, roles: Array<UserType>, firstName?: string | null, lastName?: string | null, phoneE164?: string | null, phoneVerified: boolean, phoneVerifiedAt?: any | null, notificationsEnabled: boolean, notificationPromptedAt?: any | null, pushPermissionGranted: boolean, pushPermissionStatus?: string | null, state: State, referralCode?: string | null, businessName?: string | null, providerId?: string | null, providerIsAvailable?: boolean | null, providerAvailabilityUpdatedAt?: any | null, primaryAddress?: string | null, city?: string | null, preferredLanguage: PreferredLanguage, status: ProfileStatus, lastLoginAt?: any | null, createdAt: any, updatedAt: any } };

export type UpdateNotificationSettingsMutationVariables = Exact<{
  input: UpdateNotificationSettingsInput;
}>;


export type UpdateNotificationSettingsMutation = { __typename?: 'Mutation', updateNotificationSettings: { __typename?: 'NotificationSettings', notificationsEnabled: boolean, notificationPromptedAt?: any | null, pushPermissionGranted: boolean, pushPermissionStatus?: string | null, hasActivePushDevice: boolean, lastPushDeviceSeenAt?: any | null } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, email: string, emailVerified: boolean, emailVerifiedAt?: any | null, roles: Array<UserType>, firstName?: string | null, lastName?: string | null, phoneE164?: string | null, phoneVerified: boolean, phoneVerifiedAt?: any | null, notificationsEnabled: boolean, notificationPromptedAt?: any | null, pushPermissionGranted: boolean, pushPermissionStatus?: string | null, state: State, referralCode?: string | null, businessName?: string | null, providerId?: string | null, providerIsAvailable?: boolean | null, providerAvailabilityUpdatedAt?: any | null, primaryAddress?: string | null, city?: string | null, preferredLanguage: PreferredLanguage, status: ProfileStatus, lastLoginAt?: any | null, createdAt: any, updatedAt: any } };

export type UpsertPushDeviceMutationVariables = Exact<{
  input: UpsertPushDeviceInput;
}>;


export type UpsertPushDeviceMutation = { __typename?: 'Mutation', upsertPushDevice: { __typename?: 'PushDevice', id: string, expoPushToken: string, platform?: string | null, appVersion?: string | null, pushPermissionStatus?: string | null, isActive: boolean, lastSeenAt: any } };

export type ConfirmWalletFundingMutationVariables = Exact<{
  input: ConfirmWalletFundingInput;
}>;


export type ConfirmWalletFundingMutation = { __typename?: 'Mutation', confirmWalletFunding: { __typename?: 'WalletFundingResult', success: boolean, status: PaymentIntentStatus, reference: string, authorizationUrl?: string | null, message?: string | null, paymentIntent?: { __typename?: 'PaymentIntent', id: string, walletAccountId: string, provider: string, amountMinor: any, currency: string, status: PaymentIntentStatus, paystackReference?: string | null, authorizationUrl?: string | null, confirmedAt?: any | null, createdAt: any, updatedAt: any } | null, walletTransaction?: { __typename?: 'Transaction', id: string, walletAccountId: string, direction: TransactionDirection, transactionType: TransactionType, amountMinor: any, currency: string, status: TransactionStatus, reference: string, createdAt: any, updatedAt: any } | null } };

export type CreateWalletFundingMutationVariables = Exact<{
  input: CreateWalletFundingInput;
}>;


export type CreateWalletFundingMutation = { __typename?: 'Mutation', createWalletFunding: { __typename?: 'WalletFundingResult', success: boolean, status: PaymentIntentStatus, reference: string, authorizationUrl?: string | null, message?: string | null, paymentIntent?: { __typename?: 'PaymentIntent', id: string, walletAccountId: string, provider: string, amountMinor: any, currency: string, status: PaymentIntentStatus, paystackReference?: string | null, authorizationUrl?: string | null, confirmedAt?: any | null, createdAt: any, updatedAt: any } | null, walletTransaction?: { __typename?: 'Transaction', id: string, walletAccountId: string, direction: TransactionDirection, transactionType: TransactionType, amountMinor: any, currency: string, status: TransactionStatus, reference: string, createdAt: any, updatedAt: any } | null } };

export type CreateWalletWithdrawalMutationVariables = Exact<{
  input: CreateWalletWithdrawalInput;
}>;


export type CreateWalletWithdrawalMutation = { __typename?: 'Mutation', createWalletWithdrawal: { __typename?: 'WalletWithdrawal', id: string, walletAccountId: string, profileId: string, reference: string, amountMinor: any, currency: string, status: string, bankCode?: string | null, bankName?: string | null, accountNumberMasked?: string | null, accountName?: string | null, recipientCode?: string | null, transferCode?: string | null, paystackTransferId?: string | null, failureReason?: string | null, completedAt?: any | null, failedAt?: any | null, relatedTransactionId?: string | null, savedBankAccountId?: string | null, createdAt: any, updatedAt: any } };

export type DispatchOfferSentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DispatchOfferSentSubscription = { __typename?: 'Subscription', dispatchOfferSent: { __typename?: 'DispatchOffer', batchId: string, createdAt: any, expiresAt?: any | null, id: string, metadata?: any | null, providerEtaMinutes?: number | null, providerId: string, respondedAt?: any | null, sentAt?: any | null, shipmentId: string, status: DispatchOfferStatus, updatedAt: any, vehicleId?: string | null } };

export type GetProviderDispatchTabQuaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProviderDispatchTabQuaryQuery = { __typename?: 'Query', myDispatchOffers: Array<{ __typename?: 'DispatchOffer', id: string, batchId: string, providerId: string, shipmentId: string, vehicleId?: string | null, status: DispatchOfferStatus, sentAt?: any | null, respondedAt?: any | null, expiresAt?: any | null, providerEtaMinutes?: number | null, createdAt: any, updatedAt: any }>, getProviderDashboardQuary: { __typename?: 'ProviderDashboardQuary', activeAssignments: Array<{ __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, scheduledAt?: any | null, createdAt: any, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null }> } };

export type GetProviderMarketplaceTabQuaryQueryVariables = Exact<{
  filter?: InputMaybe<MarketplaceShipmentsFilterDto>;
}>;


export type GetProviderMarketplaceTabQuaryQuery = { __typename?: 'Query', marketplaceShipments: { __typename?: 'MarketplaceShipmentsResult', nextCursor?: string | null, items: Array<{ __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, scheduledAt?: any | null, createdAt: any, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, pickupAddressSummary?: string | null, dropoffAddressSummary?: string | null }> } };

export type MyBidsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyBidsQuery = { __typename?: 'Query', myBids: Array<{ __typename?: 'ShipmentBid', id: string, shipmentId: string, providerId: string, amountMinor: any, currency: string, message?: string | null, status: BidStatus, createdAt: any, updatedAt: any }> };

export type GetProviderDashboardQuaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProviderDashboardQuaryQuery = { __typename?: 'Query', getProviderDashboardQuary: { __typename?: 'ProviderDashboardQuary', myShipmentDashboard: { __typename?: 'ShipmentDashboard', summary: { __typename?: 'ShipmentDashboardSummary', activeShipments: number, completedThisMonth: number, pendingPaymentAmountMinor: any, pendingPaymentCurrency: string }, recentShipments: Array<{ __typename?: 'ShipmentDashboardRecentShipment', id: string, trackingCode: string, status: ShipmentStatus, scheduledAt?: any | null, createdAt: any, pickupAddressSummary?: string | null, dropoffAddressSummary?: string | null }> }, myWallet?: { __typename?: 'WalletAccount', id: string, currency: string, balanceMinor: any, status: WalletAccountStatus } | null, kycStatus?: { __typename?: 'ProviderKycStatus', id: string, overallStatus: string, kycLevel: number, ninStatus: string, phoneStatus: string, faceStatus: string, vehiclePlateStatus: string, vehicleVinStatus: string } | null, activeAssignments: Array<{ __typename?: 'Shipment', id: string, trackingCode: string, mode: ShipmentMode, status: ShipmentStatus, vehicleCategory: VehicleCategory, scheduledAt?: any | null, createdAt: any, packageDescription?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null }>, completedShipments: Array<{ __typename?: 'Shipment', id: string, trackingCode: string, mode: ShipmentMode, status: ShipmentStatus, vehicleCategory: VehicleCategory, scheduledAt?: any | null, createdAt: any, updatedAt: any, packageDescription?: string | null, pricingCurrency: string, finalPriceMinor?: any | null, quotedPriceMinor?: any | null }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, category: VehicleCategory, status: VehicleStatus }> } };

export type MyKycStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type MyKycStatusQuery = { __typename?: 'Query', myKycStatus?: { __typename?: 'ProviderKycStatus', id: string, providerId: string, overallStatus: string, kycLevel: number, ninStatus: string, phoneStatus: string, faceStatus: string, vehiclePlateStatus: string, vehicleVinStatus: string, maskedNin?: string | null, maskedPhone?: string | null, failureSummary?: string | null, lastVendorSyncAt?: any | null, lastCheckAt?: any | null, createdAt: any, updatedAt: any } | null };

export type MyKycChecksQueryVariables = Exact<{
  filter?: InputMaybe<MyKycChecksFilterDto>;
}>;


export type MyKycChecksQuery = { __typename?: 'Query', myKycChecks: Array<{ __typename?: 'ProviderKycCheck', id: string, checkType: string, status: string, vendor: string, vendorReference?: string | null, responseCode?: string | null, confidence?: number | null, message?: string | null, maskedIdentifier?: string | null, createdAt: any, verifiedAt?: any | null, failedAt?: any | null }> };

export type CurrentAddressQueryVariables = Exact<{
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
}>;


export type CurrentAddressQuery = { __typename?: 'Query', currentAddress?: { __typename?: 'ResolvedAddress', placeId?: string | null, formattedAddress: string, addressLine?: string | null, city?: string | null, stateOrProvince?: string | null, postalCode?: string | null, countryCode?: string | null, latitude: number, longitude: number } | null };

export type MyShipmentDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type MyShipmentDashboardQuery = { __typename?: 'Query', myShipmentDashboard: { __typename?: 'ShipmentDashboard', summary: { __typename?: 'ShipmentDashboardSummary', totalShipments: number, activeShipments: number, completedThisMonth: number, pendingPaymentCount: number, pendingPaymentAmountMinor: any, pendingPaymentCurrency: string }, recentShipments: Array<{ __typename?: 'ShipmentDashboardRecentShipment', id: string, trackingCode: string, status: ShipmentStatus, mode: ShipmentMode, scheduledAt?: any | null, createdAt: any, pickupAddressSummary?: string | null, dropoffAddressSummary?: string | null }> } };

export type MyUserAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserAddressesQuery = { __typename?: 'Query', myUserAddresses: Array<{ __typename?: 'UserAddress', id: string, profileId: string, address: string, city: string, state: State, postalCode: string, label?: string | null, countryCode: string, lat?: number | null, lng?: number | null, createdAt: any, updatedAt: any }> };

export type SearchAddressesQueryVariables = Exact<{
  input: SearchAddressInput;
}>;


export type SearchAddressesQuery = { __typename?: 'Query', searchAddresses: Array<{ __typename?: 'AddressSuggestion', placeId: string, description: string, mainText?: string | null, secondaryText?: string | null }> };

export type ShipmentTrackingQueryVariables = Exact<{
  shipmentId: Scalars['String']['input'];
}>;


export type ShipmentTrackingQuery = { __typename?: 'Query', shipmentTracking: { __typename?: 'ShipmentTracking', shipment: { __typename?: 'Shipment', id: string, trackingCode: string, status: ShipmentStatus, packageDescription?: string | null, pickupAddressSummary?: string | null, dropoffAddressSummary?: string | null, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, createdAt: any, updatedAt: any }, events: Array<{ __typename?: 'ShipmentEvent', id: string, shipmentId: string, eventType: ShipmentEventType, actorRole?: ShipmentActorRole | null, actorProfileId?: string | null, createdAt: any }>, milestones: Array<{ __typename?: 'ShipmentMilestone', id: string, shipmentId: string, milestoneType: ShipmentMilestoneType, status: ShipmentMilestoneStatus, occurredAt?: any | null, createdAt: any, lat?: number | null, lng?: number | null }> } };

export type ShipmentQueryVariables = Exact<{
  shipmentId: Scalars['String']['input'];
}>;


export type ShipmentQuery = { __typename?: 'Query', shipment?: { __typename?: 'Shipment', id: string, trackingCode: string, customerProfileId: string, mode: ShipmentMode, vehicleCategory: VehicleCategory, scheduleType: ShipmentScheduleType, status: ShipmentStatus, pickupAddressId: string, pickupAddressSummary?: string | null, dropoffAddressId: string, dropoffAddressSummary?: string | null, scheduledAt?: any | null, packageDescription?: string | null, packageValueMinor?: any | null, specialInstructions?: string | null, requiresEscrow: boolean, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, commissionRateBps: number, commissionAmountMinor: any, createdAt: any, updatedAt: any, cancelledAt?: any | null, cancelledByProfileId?: string | null, cancellationReason?: string | null, items?: Array<{ __typename?: 'ShipmentItem', id: string, shipmentId: string, name: string, quantity: number, weightKg?: number | null, createdAt: any }> | null, pickupAddress?: { __typename?: 'UserAddress', address: string, city: string, countryCode: string, createdAt: any, id: string, label?: string | null, lat?: number | null, lng?: number | null, postalCode: string, profileId: string, state: State, updatedAt: any } | null, dropoffAddress?: { __typename?: 'UserAddress', address: string, city: string, countryCode: string, createdAt: any, id: string, label?: string | null, lat?: number | null, lng?: number | null, postalCode: string, profileId: string, state: State, updatedAt: any } | null } | null };

export type ShipmentsQueryVariables = Exact<{
  filter?: InputMaybe<ShipmentQueryFilter>;
}>;


export type ShipmentsQuery = { __typename?: 'Query', shipments: Array<{ __typename?: 'Shipment', id: string, trackingCode: string, customerProfileId: string, mode: ShipmentMode, vehicleCategory: VehicleCategory, scheduleType: ShipmentScheduleType, status: ShipmentStatus, pickupAddressId: string, dropoffAddressId: string, scheduledAt?: any | null, packageDescription?: string | null, packageValueMinor?: any | null, specialInstructions?: string | null, requiresEscrow: boolean, pricingCurrency: string, quotedPriceMinor?: any | null, finalPriceMinor?: any | null, commissionRateBps: number, commissionAmountMinor: any, createdAt: any, updatedAt: any, cancelledAt?: any | null, cancelledByProfileId?: string | null, cancellationReason?: string | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Profile', id: string, email: string, emailVerified: boolean, emailVerifiedAt?: any | null, roles: Array<UserType>, firstName?: string | null, lastName?: string | null, phoneE164?: string | null, phoneVerified: boolean, phoneVerifiedAt?: any | null, notificationsEnabled: boolean, notificationPromptedAt?: any | null, pushPermissionGranted: boolean, pushPermissionStatus?: string | null, state: State, referralCode?: string | null, businessName?: string | null, providerId?: string | null, providerIsAvailable?: boolean | null, providerAvailabilityUpdatedAt?: any | null, primaryAddress?: string | null, city?: string | null, preferredLanguage: PreferredLanguage, status: ProfileStatus, lastLoginAt?: any | null, createdAt: any, updatedAt: any } | null };

export type MyNotificationSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNotificationSettingsQuery = { __typename?: 'Query', myNotificationSettings: { __typename?: 'NotificationSettings', notificationsEnabled: boolean, notificationPromptedAt?: any | null, pushPermissionGranted: boolean, pushPermissionStatus?: string | null, hasActivePushDevice: boolean, lastPushDeviceSeenAt?: any | null } };

export type MySavedFundingCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type MySavedFundingCardsQuery = { __typename?: 'Query', mySavedFundingCards: Array<{ __typename?: 'WalletCardMethod', id: string, provider: string, brand?: string | null, cardType?: string | null, bank?: string | null, first6?: string | null, last4?: string | null, expMonth?: string | null, expYear?: string | null, reusable: boolean, channel?: string | null, createdAt: any, updatedAt: any, lastUsedAt?: any | null }> };

export type MySavedWithdrawalAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type MySavedWithdrawalAccountsQuery = { __typename?: 'Query', mySavedWithdrawalAccounts: Array<{ __typename?: 'WalletSavedBankAccount', id: string, provider: string, bankCode: string, bankName: string, accountNumberMasked: string, accountName: string, recipientCode: string, lastUsedAt?: any | null, createdAt: any, updatedAt: any }> };

export type MyWalletComplianceQueryVariables = Exact<{ [key: string]: never; }>;


export type MyWalletComplianceQuery = { __typename?: 'Query', myWalletCompliance: { __typename?: 'WalletCompliance', phoneVerified: boolean, canFund: boolean, canWithdraw: boolean, blockReasons: Array<string> } };

export type MyWalletTransactionsQueryVariables = Exact<{
  input?: InputMaybe<WalletTransactionsInput>;
}>;


export type MyWalletTransactionsQuery = { __typename?: 'Query', myWalletTransactions: { __typename?: 'WalletTransactionsConnection', nextCursor?: string | null, hasMore: boolean, items: Array<{ __typename?: 'Transaction', id: string, walletAccountId: string, direction: TransactionDirection, transactionType: TransactionType, amountMinor: any, currency: string, status: TransactionStatus, reference: string, shipmentId?: string | null, metadata?: any | null, createdAt: any, updatedAt: any }> } };

export type MyWalletQueryVariables = Exact<{ [key: string]: never; }>;


export type MyWalletQuery = { __typename?: 'Query', myWallet?: { __typename?: 'WalletAccount', id: string, ownerProfileId?: string | null, currency: string, balanceMinor: any, escrowMinor: any, status: WalletAccountStatus, createdAt: any, updatedAt: any } | null };

export type PaystackSupportedBanksQueryVariables = Exact<{
  countryCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type PaystackSupportedBanksQuery = { __typename?: 'Query', paystackSupportedBanks: Array<{ __typename?: 'WalletBank', name: string, code: string, slug?: string | null, longcode?: string | null, gateway?: string | null, payWithBank?: boolean | null, active?: boolean | null, country?: string | null, currency?: string | null }> };

export type WalletTransactionsQueryVariables = Exact<{
  walletAccountId: Scalars['String']['input'];
}>;


export type WalletTransactionsQuery = { __typename?: 'Query', walletTransactions: Array<{ __typename?: 'Transaction', id: string, walletAccountId: string, direction: TransactionDirection, transactionType: TransactionType, amountMinor: any, currency: string, status: TransactionStatus, reference: string, shipmentId?: string | null, metadata?: any | null, createdAt: any, updatedAt: any }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ForgotPasswordDocument = new TypedDocumentString(`
    mutation ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    message
    success
  }
}
    `) as unknown as TypedDocumentString<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const RefreshTokenDocument = new TypedDocumentString(`
    mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
    user {
      id
      email
      emailVerified
      emailVerifiedAt
      roles
      firstName
      lastName
      phoneE164
      phoneVerified
      phoneVerifiedAt
      notificationsEnabled
      notificationPromptedAt
      pushPermissionGranted
      pushPermissionStatus
      state
      referralCode
      preferredLanguage
      status
      lastLoginAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RequestOtpDocument = new TypedDocumentString(`
    mutation RequestOtp($input: RequestOtpInput!) {
  requestOtp(input: $input) {
    message
    success
  }
}
    `) as unknown as TypedDocumentString<RequestOtpMutation, RequestOtpMutationVariables>;
export const RequestPhoneOtpDocument = new TypedDocumentString(`
    mutation RequestPhoneOtp($input: RequestPhoneOtpInput!) {
  requestPhoneOtp(input: $input) {
    message
    success
  }
}
    `) as unknown as TypedDocumentString<RequestPhoneOtpMutation, RequestPhoneOtpMutationVariables>;
export const ResetPasswordDocument = new TypedDocumentString(`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    message
    success
  }
}
    `) as unknown as TypedDocumentString<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignInDocument = new TypedDocumentString(`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    accessToken
    refreshToken
    user {
      id
      email
      emailVerified
      emailVerifiedAt
      roles
      firstName
      lastName
      phoneE164
      phoneVerified
      phoneVerifiedAt
      notificationsEnabled
      notificationPromptedAt
      pushPermissionGranted
      pushPermissionStatus
      state
      referralCode
      preferredLanguage
      status
      lastLoginAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = new TypedDocumentString(`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    message
    success
  }
}
    `) as unknown as TypedDocumentString<SignUpMutation, SignUpMutationVariables>;
export const VerifyOtpDocument = new TypedDocumentString(`
    mutation VerifyOtp($input: VerifyOtpInput!) {
  verifyOtp(input: $input) {
    accessToken
    refreshToken
    user {
      id
      email
      emailVerified
      emailVerifiedAt
      roles
      firstName
      lastName
      phoneE164
      phoneVerified
      phoneVerifiedAt
      notificationsEnabled
      notificationPromptedAt
      pushPermissionGranted
      pushPermissionStatus
      state
      referralCode
      preferredLanguage
      status
      lastLoginAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const VerifyPhoneOtpDocument = new TypedDocumentString(`
    mutation VerifyPhoneOtp($input: VerifyPhoneOtpInput!) {
  verifyPhoneOtp(input: $input) {
    message
    success
  }
}
    `) as unknown as TypedDocumentString<VerifyPhoneOtpMutation, VerifyPhoneOtpMutationVariables>;
export const ConfirmDropoffDocument = new TypedDocumentString(`
    mutation ConfirmDropoff($shipmentId: String!) {
  confirmDropoff(shipmentId: $shipmentId) {
    id
    trackingCode
    status
    pickupAddressId
    dropoffAddressId
    packageDescription
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<ConfirmDropoffMutation, ConfirmDropoffMutationVariables>;
export const ConfirmPickupDocument = new TypedDocumentString(`
    mutation ConfirmPickup($shipmentId: String!) {
  confirmPickup(shipmentId: $shipmentId) {
    id
    trackingCode
    status
    pickupAddressId
    dropoffAddressId
    packageDescription
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<ConfirmPickupMutation, ConfirmPickupMutationVariables>;
export const MarkEnRoutePickupDocument = new TypedDocumentString(`
    mutation MarkEnRoutePickup($shipmentId: String!) {
  markEnRoutePickup(shipmentId: $shipmentId) {
    id
    trackingCode
    status
    pickupAddressId
    dropoffAddressId
    packageDescription
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<MarkEnRoutePickupMutation, MarkEnRoutePickupMutationVariables>;
export const RespondToDispatchOfferDocument = new TypedDocumentString(`
    mutation RespondToDispatchOffer($input: UpdateDispatchOfferDto!) {
  respondToDispatchOffer(input: $input) {
    id
    batchId
    providerId
    shipmentId
    vehicleId
    status
    sentAt
    respondedAt
    expiresAt
    providerEtaMinutes
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<RespondToDispatchOfferMutation, RespondToDispatchOfferMutationVariables>;
export const ConfirmMarketplaceDropoffDocument = new TypedDocumentString(`
    mutation ConfirmMarketplaceDropoff($shipmentId: String!) {
  confirmMarketplaceDropoff(shipmentId: $shipmentId) {
    id
    trackingCode
    status
    pickupAddressId
    dropoffAddressId
    packageDescription
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<ConfirmMarketplaceDropoffMutation, ConfirmMarketplaceDropoffMutationVariables>;
export const ConfirmMarketplacePickupDocument = new TypedDocumentString(`
    mutation ConfirmMarketplacePickup($shipmentId: String!) {
  confirmMarketplacePickup(shipmentId: $shipmentId) {
    id
    trackingCode
    status
    pickupAddressId
    dropoffAddressId
    packageDescription
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<ConfirmMarketplacePickupMutation, ConfirmMarketplacePickupMutationVariables>;
export const CreateShipmentBidDocument = new TypedDocumentString(`
    mutation CreateShipmentBid($input: CreateShipmentBidDto!) {
  createShipmentBid(input: $input) {
    id
    shipmentId
    providerId
    amountMinor
    currency
    message
    status
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<CreateShipmentBidMutation, CreateShipmentBidMutationVariables>;
export const MarkMarketplaceEnRoutePickupDocument = new TypedDocumentString(`
    mutation MarkMarketplaceEnRoutePickup($shipmentId: String!) {
  markMarketplaceEnRoutePickup(shipmentId: $shipmentId) {
    id
    trackingCode
    status
    pickupAddressId
    dropoffAddressId
    packageDescription
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<MarkMarketplaceEnRoutePickupMutation, MarkMarketplaceEnRoutePickupMutationVariables>;
export const WithdrawBidDocument = new TypedDocumentString(`
    mutation WithdrawBid($id: String!) {
  withdrawBid(id: $id) {
    id
    shipmentId
    providerId
    amountMinor
    currency
    message
    status
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<WithdrawBidMutation, WithdrawBidMutationVariables>;
export const CreateKycUploadUrlDocument = new TypedDocumentString(`
    mutation CreateKycUploadUrl($input: CreateKycUploadUrlDto!) {
  createKycUploadUrl(input: $input) {
    mediaId
    storageBucket
    storagePath
    uploadUrl
    expiresAt
  }
}
    `) as unknown as TypedDocumentString<CreateKycUploadUrlMutation, CreateKycUploadUrlMutationVariables>;
export const CreateVehicleDocument = new TypedDocumentString(`
    mutation CreateVehicle($input: CreateVehicleDto!) {
  createVehicle(input: $input) {
    id
    providerId
    category
    plateNumber
    vin
    make
    model
    color
    capacityKg
    capacityVolumeCm3
    plateVerificationStatus
    vinVerificationStatus
    lastVerificationAt
    verificationFailureReason
    status
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<CreateVehicleMutation, CreateVehicleMutationVariables>;
export const StartNinFaceVerificationDocument = new TypedDocumentString(`
    mutation StartNinFaceVerification($input: StartNinFaceVerificationDto!) {
  startNinFaceVerification(input: $input) {
    id
    checkType
    status
    vendor
    vendorReference
    responseCode
    confidence
    message
    maskedIdentifier
    createdAt
    verifiedAt
    failedAt
  }
}
    `) as unknown as TypedDocumentString<StartNinFaceVerificationMutation, StartNinFaceVerificationMutationVariables>;
export const StartPhoneVerificationDocument = new TypedDocumentString(`
    mutation StartPhoneVerification($input: StartPhoneVerificationDto!) {
  startPhoneVerification(input: $input) {
    id
    checkType
    status
    vendorReference
    responseCode
    message
    maskedIdentifier
    createdAt
    verifiedAt
    failedAt
  }
}
    `) as unknown as TypedDocumentString<StartPhoneVerificationMutation, StartPhoneVerificationMutationVariables>;
export const StartVehiclePlateVerificationDocument = new TypedDocumentString(`
    mutation StartVehiclePlateVerification($input: StartVehiclePlateVerificationDto!) {
  startVehiclePlateVerification(input: $input) {
    id
    checkType
    status
    vendorReference
    responseCode
    message
    maskedIdentifier
    createdAt
    verifiedAt
    failedAt
  }
}
    `) as unknown as TypedDocumentString<StartVehiclePlateVerificationMutation, StartVehiclePlateVerificationMutationVariables>;
export const StartVehicleVinVerificationDocument = new TypedDocumentString(`
    mutation StartVehicleVinVerification($input: StartVehicleVinVerificationDto!) {
  startVehicleVinVerification(input: $input) {
    id
    checkType
    status
    vendorReference
    responseCode
    message
    maskedIdentifier
    createdAt
    verifiedAt
    failedAt
  }
}
    `) as unknown as TypedDocumentString<StartVehicleVinVerificationMutation, StartVehicleVinVerificationMutationVariables>;
export const SyncKycStatusDocument = new TypedDocumentString(`
    mutation SyncKycStatus($input: SyncKycStatusDto!) {
  syncKycStatus(input: $input) {
    id
    checkType
    status
    vendorReference
    responseCode
    message
    maskedIdentifier
    createdAt
    verifiedAt
    failedAt
  }
}
    `) as unknown as TypedDocumentString<SyncKycStatusMutation, SyncKycStatusMutationVariables>;
export const AddShipmentItemDocument = new TypedDocumentString(`
    mutation AddShipmentItem($input: AddShipmentItemDto!) {
  addShipmentItem(input: $input) {
    id
    shipmentId
    name
    quantity
    weightKg
    createdAt
  }
}
    `) as unknown as TypedDocumentString<AddShipmentItemMutation, AddShipmentItemMutationVariables>;
export const CancelShipmentDocument = new TypedDocumentString(`
    mutation CancelShipment($input: CancelShipmentDto!) {
  cancelShipment(input: $input) {
    id
    trackingCode
    customerProfileId
    mode
    vehicleCategory
    scheduleType
    status
    pickupAddressId
    dropoffAddressId
    scheduledAt
    packageDescription
    packageValueMinor
    specialInstructions
    requiresEscrow
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    commissionRateBps
    commissionAmountMinor
    createdAt
    updatedAt
    cancelledAt
    cancelledByProfileId
    cancellationReason
  }
}
    `) as unknown as TypedDocumentString<CancelShipmentMutation, CancelShipmentMutationVariables>;
export const CreateShipmentDocument = new TypedDocumentString(`
    mutation CreateShipment($input: CreateShipmentDto!) {
  createShipment(input: $input) {
    id
    trackingCode
    customerProfileId
    mode
    vehicleCategory
    scheduleType
    status
    pickupAddressId
    dropoffAddressId
    scheduledAt
    packageDescription
    packageValueMinor
    specialInstructions
    requiresEscrow
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    commissionRateBps
    commissionAmountMinor
    createdAt
    updatedAt
    cancelledAt
    cancelledByProfileId
    cancellationReason
  }
}
    `) as unknown as TypedDocumentString<CreateShipmentMutation, CreateShipmentMutationVariables>;
export const CreateUserAddressDocument = new TypedDocumentString(`
    mutation CreateUserAddress($input: CreateUserAddressDto!) {
  createUserAddress(input: $input) {
    id
    profileId
    address
    city
    state
    postalCode
    label
    countryCode
    lat
    lng
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<CreateUserAddressMutation, CreateUserAddressMutationVariables>;
export const UpdateShipmentDocument = new TypedDocumentString(`
    mutation UpdateShipment($id: String!, $input: UpdateShipmentDto!) {
  updateShipment(id: $id, input: $input) {
    id
    trackingCode
    customerProfileId
    mode
    vehicleCategory
    scheduleType
    status
    pickupAddressId
    dropoffAddressId
    scheduledAt
    packageDescription
    packageValueMinor
    specialInstructions
    requiresEscrow
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    commissionRateBps
    commissionAmountMinor
    createdAt
    updatedAt
    cancelledAt
    cancelledByProfileId
    cancellationReason
  }
}
    `) as unknown as TypedDocumentString<UpdateShipmentMutation, UpdateShipmentMutationVariables>;
export const SetProviderAvailabilityDocument = new TypedDocumentString(`
    mutation SetProviderAvailability($input: SetProviderAvailabilityInput!) {
  setProviderAvailability(input: $input) {
    id
    email
    emailVerified
    emailVerifiedAt
    roles
    firstName
    lastName
    phoneE164
    phoneVerified
    phoneVerifiedAt
    notificationsEnabled
    notificationPromptedAt
    pushPermissionGranted
    pushPermissionStatus
    state
    referralCode
    businessName
    providerId
    providerIsAvailable
    providerAvailabilityUpdatedAt
    primaryAddress
    city
    preferredLanguage
    status
    lastLoginAt
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<SetProviderAvailabilityMutation, SetProviderAvailabilityMutationVariables>;
export const UpdateNotificationSettingsDocument = new TypedDocumentString(`
    mutation UpdateNotificationSettings($input: UpdateNotificationSettingsInput!) {
  updateNotificationSettings(input: $input) {
    notificationsEnabled
    notificationPromptedAt
    pushPermissionGranted
    pushPermissionStatus
    hasActivePushDevice
    lastPushDeviceSeenAt
  }
}
    `) as unknown as TypedDocumentString<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>;
export const UpdateProfileDocument = new TypedDocumentString(`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    email
    emailVerified
    emailVerifiedAt
    roles
    firstName
    lastName
    phoneE164
    phoneVerified
    phoneVerifiedAt
    notificationsEnabled
    notificationPromptedAt
    pushPermissionGranted
    pushPermissionStatus
    state
    referralCode
    businessName
    providerId
    providerIsAvailable
    providerAvailabilityUpdatedAt
    primaryAddress
    city
    preferredLanguage
    status
    lastLoginAt
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpsertPushDeviceDocument = new TypedDocumentString(`
    mutation UpsertPushDevice($input: UpsertPushDeviceInput!) {
  upsertPushDevice(input: $input) {
    id
    expoPushToken
    platform
    appVersion
    pushPermissionStatus
    isActive
    lastSeenAt
  }
}
    `) as unknown as TypedDocumentString<UpsertPushDeviceMutation, UpsertPushDeviceMutationVariables>;
export const ConfirmWalletFundingDocument = new TypedDocumentString(`
    mutation ConfirmWalletFunding($input: ConfirmWalletFundingInput!) {
  confirmWalletFunding(input: $input) {
    success
    status
    reference
    authorizationUrl
    message
    paymentIntent {
      id
      walletAccountId
      provider
      amountMinor
      currency
      status
      paystackReference
      authorizationUrl
      confirmedAt
      createdAt
      updatedAt
    }
    walletTransaction {
      id
      walletAccountId
      direction
      transactionType
      amountMinor
      currency
      status
      reference
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<ConfirmWalletFundingMutation, ConfirmWalletFundingMutationVariables>;
export const CreateWalletFundingDocument = new TypedDocumentString(`
    mutation CreateWalletFunding($input: CreateWalletFundingInput!) {
  createWalletFunding(input: $input) {
    success
    status
    reference
    authorizationUrl
    message
    paymentIntent {
      id
      walletAccountId
      provider
      amountMinor
      currency
      status
      paystackReference
      authorizationUrl
      confirmedAt
      createdAt
      updatedAt
    }
    walletTransaction {
      id
      walletAccountId
      direction
      transactionType
      amountMinor
      currency
      status
      reference
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateWalletFundingMutation, CreateWalletFundingMutationVariables>;
export const CreateWalletWithdrawalDocument = new TypedDocumentString(`
    mutation CreateWalletWithdrawal($input: CreateWalletWithdrawalInput!) {
  createWalletWithdrawal(input: $input) {
    id
    walletAccountId
    profileId
    reference
    amountMinor
    currency
    status
    bankCode
    bankName
    accountNumberMasked
    accountName
    recipientCode
    transferCode
    paystackTransferId
    failureReason
    completedAt
    failedAt
    relatedTransactionId
    savedBankAccountId
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<CreateWalletWithdrawalMutation, CreateWalletWithdrawalMutationVariables>;
export const DispatchOfferSentDocument = new TypedDocumentString(`
    subscription DispatchOfferSent {
  dispatchOfferSent {
    batchId
    createdAt
    expiresAt
    id
    metadata
    providerEtaMinutes
    providerId
    respondedAt
    sentAt
    shipmentId
    status
    updatedAt
    vehicleId
  }
}
    `) as unknown as TypedDocumentString<DispatchOfferSentSubscription, DispatchOfferSentSubscriptionVariables>;
export const GetProviderDispatchTabQuaryDocument = new TypedDocumentString(`
    query getProviderDispatchTabQuary {
  myDispatchOffers {
    id
    batchId
    providerId
    shipmentId
    vehicleId
    status
    sentAt
    respondedAt
    expiresAt
    providerEtaMinutes
    createdAt
    updatedAt
  }
  getProviderDashboardQuary {
    activeAssignments {
      id
      trackingCode
      status
      pickupAddressId
      dropoffAddressId
      scheduledAt
      createdAt
      packageDescription
      pricingCurrency
      quotedPriceMinor
      finalPriceMinor
    }
  }
}
    `) as unknown as TypedDocumentString<GetProviderDispatchTabQuaryQuery, GetProviderDispatchTabQuaryQueryVariables>;
export const GetProviderMarketplaceTabQuaryDocument = new TypedDocumentString(`
    query getProviderMarketplaceTabQuary($filter: MarketplaceShipmentsFilterDto) {
  marketplaceShipments(filter: $filter) {
    items {
      id
      trackingCode
      status
      scheduledAt
      createdAt
      packageDescription
      pricingCurrency
      quotedPriceMinor
      finalPriceMinor
      pickupAddressSummary
      dropoffAddressSummary
    }
    nextCursor
  }
}
    `) as unknown as TypedDocumentString<GetProviderMarketplaceTabQuaryQuery, GetProviderMarketplaceTabQuaryQueryVariables>;
export const MyBidsDocument = new TypedDocumentString(`
    query MyBids {
  myBids {
    id
    shipmentId
    providerId
    amountMinor
    currency
    message
    status
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<MyBidsQuery, MyBidsQueryVariables>;
export const GetProviderDashboardQuaryDocument = new TypedDocumentString(`
    query getProviderDashboardQuary {
  getProviderDashboardQuary {
    myShipmentDashboard {
      summary {
        activeShipments
        completedThisMonth
        pendingPaymentAmountMinor
        pendingPaymentCurrency
      }
      recentShipments {
        id
        trackingCode
        status
        scheduledAt
        createdAt
        pickupAddressSummary
        dropoffAddressSummary
      }
    }
    myWallet {
      id
      currency
      balanceMinor
      status
    }
    kycStatus {
      id
      overallStatus
      kycLevel
      ninStatus
      phoneStatus
      faceStatus
      vehiclePlateStatus
      vehicleVinStatus
    }
    activeAssignments {
      id
      trackingCode
      mode
      status
      vehicleCategory
      scheduledAt
      createdAt
      packageDescription
      pricingCurrency
      quotedPriceMinor
      finalPriceMinor
    }
    completedShipments {
      id
      trackingCode
      mode
      status
      vehicleCategory
      scheduledAt
      createdAt
      updatedAt
      packageDescription
      pricingCurrency
      finalPriceMinor
      quotedPriceMinor
    }
    vehicles {
      id
      category
      status
    }
  }
}
    `) as unknown as TypedDocumentString<GetProviderDashboardQuaryQuery, GetProviderDashboardQuaryQueryVariables>;
export const MyKycStatusDocument = new TypedDocumentString(`
    query MyKycStatus {
  myKycStatus {
    id
    providerId
    overallStatus
    kycLevel
    ninStatus
    phoneStatus
    faceStatus
    vehiclePlateStatus
    vehicleVinStatus
    maskedNin
    maskedPhone
    failureSummary
    lastVendorSyncAt
    lastCheckAt
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<MyKycStatusQuery, MyKycStatusQueryVariables>;
export const MyKycChecksDocument = new TypedDocumentString(`
    query MyKycChecks($filter: MyKycChecksFilterDto) {
  myKycChecks(filter: $filter) {
    id
    checkType
    status
    vendor
    vendorReference
    responseCode
    confidence
    message
    maskedIdentifier
    createdAt
    verifiedAt
    failedAt
  }
}
    `) as unknown as TypedDocumentString<MyKycChecksQuery, MyKycChecksQueryVariables>;
export const CurrentAddressDocument = new TypedDocumentString(`
    query CurrentAddress($lat: Float!, $lng: Float!) {
  currentAddress(lat: $lat, lng: $lng) {
    placeId
    formattedAddress
    addressLine
    city
    stateOrProvince
    postalCode
    countryCode
    latitude
    longitude
  }
}
    `) as unknown as TypedDocumentString<CurrentAddressQuery, CurrentAddressQueryVariables>;
export const MyShipmentDashboardDocument = new TypedDocumentString(`
    query MyShipmentDashboard {
  myShipmentDashboard {
    summary {
      totalShipments
      activeShipments
      completedThisMonth
      pendingPaymentCount
      pendingPaymentAmountMinor
      pendingPaymentCurrency
    }
    recentShipments {
      id
      trackingCode
      status
      mode
      scheduledAt
      createdAt
      pickupAddressSummary
      dropoffAddressSummary
    }
  }
}
    `) as unknown as TypedDocumentString<MyShipmentDashboardQuery, MyShipmentDashboardQueryVariables>;
export const MyUserAddressesDocument = new TypedDocumentString(`
    query MyUserAddresses {
  myUserAddresses {
    id
    profileId
    address
    city
    state
    postalCode
    label
    countryCode
    lat
    lng
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<MyUserAddressesQuery, MyUserAddressesQueryVariables>;
export const SearchAddressesDocument = new TypedDocumentString(`
    query SearchAddresses($input: SearchAddressInput!) {
  searchAddresses(input: $input) {
    placeId
    description
    mainText
    secondaryText
  }
}
    `) as unknown as TypedDocumentString<SearchAddressesQuery, SearchAddressesQueryVariables>;
export const ShipmentTrackingDocument = new TypedDocumentString(`
    query ShipmentTracking($shipmentId: String!) {
  shipmentTracking(id: $shipmentId) {
    shipment {
      id
      trackingCode
      status
      packageDescription
      pickupAddressSummary
      dropoffAddressSummary
      pricingCurrency
      quotedPriceMinor
      finalPriceMinor
      createdAt
      updatedAt
    }
    events {
      id
      shipmentId
      eventType
      actorRole
      actorProfileId
      createdAt
    }
    milestones {
      id
      shipmentId
      milestoneType
      status
      occurredAt
      createdAt
      lat
      lng
    }
  }
}
    `) as unknown as TypedDocumentString<ShipmentTrackingQuery, ShipmentTrackingQueryVariables>;
export const ShipmentDocument = new TypedDocumentString(`
    query Shipment($shipmentId: String!) {
  shipment(id: $shipmentId) {
    id
    trackingCode
    customerProfileId
    mode
    vehicleCategory
    scheduleType
    status
    pickupAddressId
    pickupAddressSummary
    dropoffAddressId
    dropoffAddressSummary
    scheduledAt
    packageDescription
    packageValueMinor
    specialInstructions
    requiresEscrow
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    commissionRateBps
    commissionAmountMinor
    createdAt
    updatedAt
    cancelledAt
    cancelledByProfileId
    cancellationReason
    items {
      id
      shipmentId
      name
      quantity
      weightKg
      createdAt
    }
    pickupAddress {
      address
      city
      countryCode
      createdAt
      id
      label
      lat
      lng
      postalCode
      profileId
      state
      updatedAt
    }
    dropoffAddress {
      address
      city
      countryCode
      createdAt
      id
      label
      lat
      lng
      postalCode
      profileId
      state
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<ShipmentQuery, ShipmentQueryVariables>;
export const ShipmentsDocument = new TypedDocumentString(`
    query Shipments($filter: ShipmentQueryFilter) {
  shipments(filter: $filter) {
    id
    trackingCode
    customerProfileId
    mode
    vehicleCategory
    scheduleType
    status
    pickupAddressId
    dropoffAddressId
    scheduledAt
    packageDescription
    packageValueMinor
    specialInstructions
    requiresEscrow
    pricingCurrency
    quotedPriceMinor
    finalPriceMinor
    commissionRateBps
    commissionAmountMinor
    createdAt
    updatedAt
    cancelledAt
    cancelledByProfileId
    cancellationReason
  }
}
    `) as unknown as TypedDocumentString<ShipmentsQuery, ShipmentsQueryVariables>;
export const MeDocument = new TypedDocumentString(`
    query Me {
  me {
    id
    email
    emailVerified
    emailVerifiedAt
    roles
    firstName
    lastName
    phoneE164
    phoneVerified
    phoneVerifiedAt
    notificationsEnabled
    notificationPromptedAt
    pushPermissionGranted
    pushPermissionStatus
    state
    referralCode
    businessName
    providerId
    providerIsAvailable
    providerAvailabilityUpdatedAt
    primaryAddress
    city
    preferredLanguage
    status
    lastLoginAt
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<MeQuery, MeQueryVariables>;
export const MyNotificationSettingsDocument = new TypedDocumentString(`
    query MyNotificationSettings {
  myNotificationSettings {
    notificationsEnabled
    notificationPromptedAt
    pushPermissionGranted
    pushPermissionStatus
    hasActivePushDevice
    lastPushDeviceSeenAt
  }
}
    `) as unknown as TypedDocumentString<MyNotificationSettingsQuery, MyNotificationSettingsQueryVariables>;
export const MySavedFundingCardsDocument = new TypedDocumentString(`
    query MySavedFundingCards {
  mySavedFundingCards {
    id
    provider
    brand
    cardType
    bank
    first6
    last4
    expMonth
    expYear
    reusable
    channel
    createdAt
    updatedAt
    lastUsedAt
  }
}
    `) as unknown as TypedDocumentString<MySavedFundingCardsQuery, MySavedFundingCardsQueryVariables>;
export const MySavedWithdrawalAccountsDocument = new TypedDocumentString(`
    query MySavedWithdrawalAccounts {
  mySavedWithdrawalAccounts {
    id
    provider
    bankCode
    bankName
    accountNumberMasked
    accountName
    recipientCode
    lastUsedAt
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<MySavedWithdrawalAccountsQuery, MySavedWithdrawalAccountsQueryVariables>;
export const MyWalletComplianceDocument = new TypedDocumentString(`
    query MyWalletCompliance {
  myWalletCompliance {
    phoneVerified
    canFund
    canWithdraw
    blockReasons
  }
}
    `) as unknown as TypedDocumentString<MyWalletComplianceQuery, MyWalletComplianceQueryVariables>;
export const MyWalletTransactionsDocument = new TypedDocumentString(`
    query MyWalletTransactions($input: WalletTransactionsInput) {
  myWalletTransactions(input: $input) {
    items {
      id
      walletAccountId
      direction
      transactionType
      amountMinor
      currency
      status
      reference
      shipmentId
      metadata
      createdAt
      updatedAt
    }
    nextCursor
    hasMore
  }
}
    `) as unknown as TypedDocumentString<MyWalletTransactionsQuery, MyWalletTransactionsQueryVariables>;
export const MyWalletDocument = new TypedDocumentString(`
    query MyWallet {
  myWallet {
    id
    ownerProfileId
    currency
    balanceMinor
    escrowMinor
    status
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<MyWalletQuery, MyWalletQueryVariables>;
export const PaystackSupportedBanksDocument = new TypedDocumentString(`
    query PaystackSupportedBanks($countryCode: String) {
  paystackSupportedBanks(countryCode: $countryCode) {
    name
    code
    slug
    longcode
    gateway
    payWithBank
    active
    country
    currency
  }
}
    `) as unknown as TypedDocumentString<PaystackSupportedBanksQuery, PaystackSupportedBanksQueryVariables>;
export const WalletTransactionsDocument = new TypedDocumentString(`
    query WalletTransactions($walletAccountId: String!) {
  walletTransactions(walletAccountId: $walletAccountId) {
    id
    walletAccountId
    direction
    transactionType
    amountMinor
    currency
    status
    reference
    shipmentId
    metadata
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<WalletTransactionsQuery, WalletTransactionsQueryVariables>;