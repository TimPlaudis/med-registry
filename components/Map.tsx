"use client";

import { useEffect, useRef } from "react";

export default function Map({ clinics }: any) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

    script.onload = () => {
      // @ts-ignore
      ymaps.ready(() => {
        // @ts-ignore
        const map = new ymaps.Map(mapRef.current, {
          center: [51.128, 71.430], // Астана
          zoom: 11,
        });

        clinics.forEach((c: any) => {
          // @ts-ignore
          const placemark = new ymaps.Placemark(
            [c.lat, c.lng],
            {
              balloonContent: `
                <b>${c.name}</b><br/>
                ${c.address}
              `,
            }
          );

          map.geoObjects.add(placemark);
        });
      });
    };

    document.body.appendChild(script);
  }, [clinics]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "12px",
      }}
    />
  );
}
