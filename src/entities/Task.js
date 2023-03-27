export class Task {
  constructor(id, title, description, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed_at = null;
    this.created_at = createdAt ?? new Date();
    this.updated_at = updatedAt ?? new Date();
  }
}
