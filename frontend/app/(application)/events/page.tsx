"use client";

import Image from "next/image";
import Link from "next/link";
import { useReadContract, useAccount } from "wagmi";
import { Calendar, CircleDollarSign, Clock } from "lucide-react";

import { blocTicketsAbi } from "@/blockchain/abi/blocTickets-abi";
import { Skeleton } from "@/components/ui/skeleton";
import { convertDateFromMilliseconds } from "@/lib/utils";
import { Header } from "@/components/header";

export default function EventsPage() {
  const { address, isConnected } = useAccount();

  const {
    data: events,
    isPending,
    error,
  } = useReadContract({
    address: "0xcB9d3CF208858200EF12893db3dEF2Df191cb6C5",
    abi: blocTicketsAbi,
    functionName: "getAllEvents",
  });

  return (
    <main className="flex flex-col px-4">
      <Header />
      <section className="py-6">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Upcoming Events
            </h1>
          </div>

          {!isConnected ? (
            <div className="flex h-screen items-center justify-center">
              <p>Connect your wallet to view events</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex h-screen items-center justify-center">
                  <p>
                    Error fetching events, connect wallet if not connected and
                    try again
                  </p>
                </div>
              )}

              {isPending ? (
                <Skeleton className="h-[250px] rounded-xl" />
              ) : (
                <>
                  {events?.length === 0 && (
                    <div className="flex h-screen items-center justify-center">
                      <p>No events found</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10">
                    {events?.map((event, index) => (
                      <Link href={`/event-details/${index}`} key={index}>
                        <div
                          key={index}
                          className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg "
                        >
                          {/* TODO: Replace with users uploaded image */}
                          <Image
                            alt="Event 1"
                            className="h-60 w-full object-cover"
                            height="200"
                            src="/static/images/concert/concert-1.jpg"
                            style={{
                              aspectRatio: "300/200",
                              objectFit: "cover",
                            }}
                            width="300"
                          />
                          <div className="p-4 md:p-6">
                            <h3 className="mb-2 text-lg font-semibold md:text-xl">
                              {event.name}
                            </h3>
                            <div className="mb-3 flex items-center space-x-2">
                              <Calendar className="h-5 w-5 text-gray-500 " />
                              <p className="text-gray-500 ">
                                {convertDateFromMilliseconds(
                                  Number(event.date),
                                )}
                              </p>
                            </div>
                            <div className="mb-3 flex items-center space-x-2">
                              <Clock className="h-5 w-5 text-gray-500 " />
                              <p className="text-gray-500 ">{event.time}</p>
                            </div>
                            <div className="mb-3 flex items-center space-x-2">
                              <CircleDollarSign className="h-5 w-5 text-gray-500 " />
                              <p className="text-gray-500 ">
                                {event.price} cUSD
                              </p>
                            </div>

                            <p className="line-clamp-2 text-gray-600 ">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
