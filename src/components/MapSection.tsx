"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Map, 
  MapMarker, 
  MarkerContent, 
  MarkerPopup, 
  MapControls,
  type MapRef
} from "@/components/ui/mapcn-map-route";
import { MapPin, Phone, Mail, ExternalLink, Building2, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

const offices = [
  {
    id: "corporate",
    name: "Corporate Office",
    address: "#27, Sriranga complex, 2nd Floor, 2nd Main Road, Dr.MC Modi Hospital Road, West of Chord Road, 2nd Stage, Bengaluru-560086",
    phone: "+91 9591578333",
    email: "info@triotax.in",
    coordinates: [77.53856, 12.99883] as [number, number], // [lng, lat]
    icon: Building2,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=TRIOTAX+Corporate+Office+Bengaluru"
  },
  {
    id: "branch",
    name: "Branch Office",
    address: "#02, Venkateshwara Sawmill Complex, Court Road, Vinayakanagara, Doddballapura, Bengaluru Rural-561203",
    phone: "+91 9591578333",
    email: "info@triotax.in",
    coordinates: [77.5350, 13.2920] as [number, number], // [lng, lat]
    icon: Landmark,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=TRIOTAX+Branch+Office+Doddaballapura"
  }
];

export function MapSection({ theme }: { theme?: 'light' | 'dark' }) {
  const [activeOffice, setActiveOffice] = useState<string>("corporate");
  const mapRef = useRef<MapRef | null>(null);

  const selectedOffice = offices.find((o) => o.id === activeOffice) || offices[0];

  // Fly to the coordinates when the active office changes
  const handleOfficeChange = (officeId: string) => {
    const office = offices.find((o) => o.id === officeId);
    if (office && mapRef.current) {
      mapRef.current.flyTo({
        center: office.coordinates,
        zoom: 15,
        duration: 1500,
        essential: true
      });
    }
  };

  // Ensure map is properly sized after mounting or swapping tabs
  useEffect(() => {
    if (mapRef.current) {
      const resizeTimer = setTimeout(() => {
        mapRef.current?.resize();
      }, 300);
      return () => clearTimeout(resizeTimer);
    }
  }, [activeOffice]);

  return (
    <section className="w-full py-20 px-6 sm:px-12 md:px-20 bg-neutral-50 dark:bg-[#08080A] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 border-t border-neutral-200/50 dark:border-neutral-900/60">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#192837] dark:text-white transition-colors duration-300 mb-4">
            Our Offices
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Visit us in person at our Corporate Office in Bengaluru or our Branch Office in Bengaluru Rural.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-neutral-200/60 dark:bg-neutral-900 p-1.25 rounded-full max-w-xs sm:max-w-sm mx-auto mb-12 shadow-inner border border-neutral-300/30 dark:border-neutral-800/30">
          {offices.map((office) => {
            const Icon = office.icon;
            const isActive = activeOffice === office.id;
            return (
              <button
                key={office.id}
                onClick={() => {
                  setActiveOffice(office.id);
                  handleOfficeChange(office.id);
                }}
                className={cn(
                  "flex-1 py-2.5 px-3 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                  isActive
                    ? "bg-[#7342E2] text-white shadow-md"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{office.name}</span>
              </button>
            );
          })}
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/60 dark:border-neutral-800/80 shadow-md">
            <div>
              <div className="inline-flex p-3 rounded-2xl bg-[#7342E2]/10 dark:bg-[#7342E2]/20 text-[#7342E2] dark:text-[#a882fa] mb-6">
                <selectedOffice.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#192837] dark:text-white mb-4">
                {selectedOffice.name}
              </h3>
              
              <div className="space-y-4">
                {/* Address Item */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-neutral-400 dark:text-neutral-500 mt-1 shrink-0" />
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {selectedOffice.address}
                  </p>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
                  <a 
                    href={`tel:${selectedOffice.phone}`}
                    className="text-xs sm:text-sm text-[#7342E2] dark:text-[#a882fa] font-semibold hover:underline"
                  >
                    {selectedOffice.phone}
                  </a>
                </div>

                {/* Email Item */}
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
                  <a 
                    href={`mailto:${selectedOffice.email}`}
                    className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 hover:text-[#7342E2] dark:hover:text-[#a882fa]"
                  >
                    {selectedOffice.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <a
              href={selectedOffice.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-neutral-100 hover:bg-[#7342E2] dark:bg-neutral-800/80 dark:hover:bg-[#7342E2] hover:text-white dark:hover:text-white text-neutral-800 dark:text-neutral-200 font-bold text-xs border border-neutral-200 dark:border-neutral-800 hover:border-[#7342E2] dark:hover:border-[#7342E2] transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </a>
          </div>

          {/* Right Interactive Map Panel */}
          <div className="lg:col-span-8 h-[360px] sm:h-[450px] rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 shadow-md relative bg-neutral-100 dark:bg-neutral-950">
            <Map
              ref={mapRef}
              theme={theme}
              zoom={14}
              center={selectedOffice.coordinates}
              className="h-full w-full"
            >
              {/* Map Controls */}
              <MapControls showZoom showCompass showFullscreen position="bottom-right" />

              {/* Render both office markers */}
              {offices.map((office) => {
                const isSelected = office.id === activeOffice;
                return (
                  <MapMarker
                    key={office.id}
                    longitude={office.coordinates[0]}
                    latitude={office.coordinates[1]}
                  >
                    {/* Visual dot pin */}
                    <MarkerContent>
                      <div className={cn(
                        "p-2.5 rounded-full border-2 border-white shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110",
                        isSelected 
                          ? "bg-[#7342E2] text-white scale-110 ring-4 ring-[#7342E2]/20" 
                          : "bg-neutral-500/80 text-white dark:bg-neutral-700/80"
                      )}>
                        <MapPin className="h-4 w-4" />
                      </div>
                    </MarkerContent>

                    {/* Popup label description */}
                    <MarkerPopup closeButton={false}>
                      <div className="p-1 min-w-[160px]">
                        <h4 className="font-bold text-xs text-[#7342E2] dark:text-[#a882fa] mb-1">{office.name}</h4>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-normal">{office.address}</p>
                      </div>
                    </MarkerPopup>
                  </MapMarker>
                );
              })}
            </Map>
          </div>
        </div>
      </div>
    </section>
  );
}
