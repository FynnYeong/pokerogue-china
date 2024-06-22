
export enum EventType {
    SHINY
}

interface TimedEvent {
    name: string;
    eventType: EventType;
    shinyMultiplier?: number;
    startDate: Date;
    endDate: Date;
    bannerFilename?: string
}

// const pokerogueTimedEvents: TimedEvent[] = [
//   {
//     name: "Pride Update",
//     eventType: EventType.SHINY,
//     shinyMultiplier: 2,
//     startDate: new Date(Date.UTC(2024, 5, 14, 0)),
//     endDate: new Date(Date.UTC(2024, 5, 22, 0)),
//     bannerFilename: "pride-update"
//   },
// ];

export class TimedEventManager {
  constructor() {}

  isActive(event: TimedEvent) {
    return (
      event.startDate < new Date() &&
        new Date() < event.endDate
    );
  }

  activeEvent(): TimedEvent | undefined {
    return window.pokerogueTimedEvents?.find((te: TimedEvent) => this.isActive(te));
  }

  isEventActive(): boolean {
    return window.pokerogueTimedEvents?.some((te: TimedEvent) => this.isActive(te));
  }

  activeEventHasBanner(): boolean {
    const activeEvents = window.pokerogueTimedEvents?.filter((te) => this.isActive(te) && te.hasOwnProperty("bannerFilename"));
    return activeEvents.length > 0;
  }

  getShinyMultiplier(): number {
    let multiplier = 1;
    const shinyEvents = window.pokerogueTimedEvents?.filter((te) => te.eventType === EventType.SHINY && this.isActive(te));
    shinyEvents.forEach((se) => {
      multiplier *= se.shinyMultiplier;
    });

    return multiplier;
  }

  // getShinyMultiplier(): number {
  //   let multiplier = 1;
  //   const shinyEvents = window.pokerogueTimedEvents?.filter((te) => te.eventType === EventType.SHINY && this.isActive(te));
  //   shinyEvents.forEach((se) => {
  //     multiplier *= se.shinyMultiplier;
  //   });

  //   return multiplier;
  // }


  getEventBannerFilename(): string {
    return window.pokerogueTimedEvents?.find((te: TimedEvent) => this.isActive(te)).bannerFilename ?? null;
  }
}
