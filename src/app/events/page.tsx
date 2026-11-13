
import EventsCard from '../components/events/EventsCard';
import { Suspense } from 'react';




 async function Events(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`,{
        cache:"no-store"
    });
if(!res.ok){
    throw new Error("Failed to fetch events");
}

    const events = await res.json()
    console.log(events, "nwe");
   return <EventsCard events = {events}/>

  
    }
    
function EventsSkeleton() {
  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="h-12 w-96 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-4 h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-sm border border-border bg-muted/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}


    // return (
        
    // );
export default function MyEventsPage(){
    return(
        <Suspense fallback={<EventsSkeleton/>}>
<Events/>

        </Suspense>
    )
}