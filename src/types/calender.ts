export interface CalenderTask {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  category: "To Do" | "In Progress" | "Review" | "Completed";
  color?: string;
}
