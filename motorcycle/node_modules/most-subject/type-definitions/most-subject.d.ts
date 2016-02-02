import {Stream} from "most";

interface Observer {
  add(x: any): void;
  next(x: any): void;

  end(x?: any): void;
  complete(x?: any): void;

  error(e: Error): void;
}

declare interface Subject {
  sink: Observer;
  observer: Observer;
  stream: Stream<any>;
}

export function subject(intialValue?: any): Subject;
export function holdSubject(bufferSize?: number, initialValue?: any): Subject;
