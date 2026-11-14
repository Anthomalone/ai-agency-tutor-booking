// Shared types. These mirror supabase/migrations/0001_init.sql. Owned by the Chief Architect:
// lanes must ask before changing this file.

export type Role = "student" | "tutor" | "owner";

export type Profile = {
  id: string;
  role: Role;
  full_name: string;
  time_zone: string; // IANA zone, for example "Asia/Dubai"
  created_at: string;
};

export type Tutor = {
  id: string;
  profile_id: string | null; // null until the owner creates the tutor's login
  name: string;
  headline: string;
  bio: string;
  subjects: string[];
  photo_url: string;
  time_zone: string;
  active: boolean;
  created_at: string;
};

export type Availability = {
  id: string;
  tutor_id: string;
  weekday: number; // 0 = Sunday ... 6 = Saturday, in the tutor's time zone
  start_time: string; // "HH:MM:SS" in the tutor's time zone
  active: boolean;
};

export type ProgrammeStatus = "pending_payment" | "active" | "cancelled" | "completed";
export type RefundStatus = "none" | "pending" | "refunded" | "failed";

export type Programme = {
  id: string;
  student_id: string;
  tutor_id: string;
  availability_id: string;
  start_date: string; // "YYYY-MM-DD"
  status: ProgrammeStatus;
  price_fils: number;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  paid_at: string | null;
  cancelled_at: string | null;
  cancelled_by: "student" | "owner" | null;
  refund_fils: number;
  refund_status: RefundStatus;
  created_at: string;
};

export type LessonStatus = "upcoming" | "done" | "cancelled";

export type Lesson = {
  id: string;
  programme_id: string;
  starts_at: string; // UTC ISO string
  status: LessonStatus;
};

export type Payment = {
  id: string;
  programme_id: string;
  amount_fils: number;
  status: "paid" | "failed" | "refunded";
  stripe_ref: string | null;
  created_at: string;
};

export type Message = {
  id: string;
  programme_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export type Review = {
  id: string;
  lesson_id: string;
  programme_id: string;
  tutor_id: string;
  student_id: string;
  stars: number; // 1 to 5
  body: string;
  hidden: boolean;
  created_at: string;
};

// The one function both lanes rely on (see docs/lanes). Lane A implements it in lib/programme/cancel.ts:
// it refunds through Stripe, marks the programme and its lessons cancelled, frees the weekly time and
// emails the student and the tutor. Lane B calls it from the admin area.
export type CancelProgrammeInput = {
  programmeId: string;
  cancelledBy: "student" | "owner";
};
export type CancelProgrammeResult = {
  refundFils: number;
  isFullRefund: boolean;
};
