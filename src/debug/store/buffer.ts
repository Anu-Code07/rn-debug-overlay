export class RingBuffer<T> {
  private data: (T | undefined)[];
  private idx = 0;
  private filled = false;
  constructor(private capacity: number) { this.data = new Array(capacity); }
  push(item: T) { this.data[this.idx] = item; this.idx = (this.idx + 1) % this.capacity; if (this.idx === 0) this.filled = true; }
  toArray(): T[] {
    return (this.filled ? [...this.data.slice(this.idx), ...this.data.slice(0, this.idx)] : this.data.slice(0, this.idx)).filter(Boolean) as T[];
  }
  clear() { this.idx = 0; this.filled = false; this.data = new Array(this.capacity); }
}