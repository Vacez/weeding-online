export type Role = 'CUSTOMER' | 'ADMIN';
export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' | 'REFUNDED';
export type InvitationStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type AttendanceStatus = 'ATTENDING' | 'NOT_ATTENDING' | 'MAYBE';

export interface CulturalTradition {
  id: string;
  name: string;
  slug: string;
  region: string;
  description: string;
  bannerUrl?: string | null;
  culturalElements?: string | null;
  colorPalette?: string | null;
}

export interface ThemeCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
}

export interface Theme {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  categoryId: string;
  category?: ThemeCategory;
  traditionId?: string | null;
  tradition?: CulturalTradition | null;
  price: number;
  originalPrice?: number | null;
  badge?: string | null;
  rating: number;
  salesCount: number;
  coverImage: string;
  previewImages: string; // JSON array string
  features: string; // JSON array string
  colorPalette: string; // JSON array string
  musicUrl?: string | null;
  format: string;
  active: boolean;
  featured: boolean;
}

export interface Package {
  id: string;
  code: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  description: string;
  isPopular: boolean;
  features: string; // JSON array
  active: boolean;
}

export interface LoveStoryItem {
  year: string;
  title: string;
  story: string;
}

export interface InvitationContent {
  id: string;
  invitationId: string;
  groomName: string;
  groomNickname: string;
  groomFather: string;
  groomMother: string;
  groomPhoto?: string | null;
  groomInstagram?: string | null;
  brideName: string;
  brideNickname: string;
  brideFather: string;
  brideMother: string;
  bridePhoto?: string | null;
  brideInstagram?: string | null;
  quote?: string | null;
  quoteSource?: string | null;
  openingGreeting?: string | null;
  closingGreeting?: string | null;
  loveStoryJson?: string | null;
}

export interface InvitationEvent {
  id: string;
  invitationId: string;
  title: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  venueName: string;
  venueAddress: string;
  mapsUrl?: string | null;
  isPrimary: boolean;
}

export interface InvitationGallery {
  id: string;
  invitationId: string;
  imageUrl: string;
  caption?: string | null;
  sortOrder: number;
}

export interface DigitalGift {
  id: string;
  invitationId: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisImageUrl?: string | null;
}

export interface RSVPItem {
  id: string;
  invitationId: string;
  guestName: string;
  attendance: AttendanceStatus;
  pax: number;
  message: string;
  createdAt: string | Date;
}

export interface GuestItem {
  id: string;
  invitationId: string;
  name: string;
  slug: string;
  phone?: string | null;
  email?: string | null;
  qrCodeUrl?: string | null;
  createdAt?: string | Date;
}

export interface FullInvitation {
  id: string;
  slug: string;
  title: string;
  userId: string;
  orderId?: string | null;
  themeId: string;
  theme: Theme;
  packageId: string;
  package: Package;
  status: InvitationStatus;
  viewCount: number;
  publishedAt?: string | Date | null;
  musicUrl?: string | null;
  content: InvitationContent | null;
  events: InvitationEvent[];
  galleries: InvitationGallery[];
  gifts: DigitalGift[];
  rsvps: RSVPItem[];
  guests: GuestItem[];
}
