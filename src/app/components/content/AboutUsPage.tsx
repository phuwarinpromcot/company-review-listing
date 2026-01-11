"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section id="about-us" className="w-full bg-[var(--primary-100)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
          <header className="mb-8">
            <h1 className="text-4xl text-[var(--text-primary-color)] font-bold text-left">
              {t("about-us-page.title")}
            </h1>
          </header>

          <article className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-5 items-center">
            <figure className="flex justify-center lg:justify-start">
              <Image
                src="/images/about-1.svg"
                alt="Finance Companies"
                width={300}
                height={300}
                className="w-full max-w-xs"
              />
              {/* <figcaption>Finance Companies illustration</figcaption> */}
            </figure>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl text-[var(--text-primary-color)] font-semibold">
                  {t("about-us-page.title1")}
                </h2>
                <p className="text-[var(--text-primary-color)] leading-relaxed">
                  {t("about-us-page.message1")}
                </p>
              </section>

              <section>
                <h2 className="text-2xl text-[var(--text-primary-color)] font-semibold">
                  {t("about-us-page.title2")}
                </h2>
                <p className="text-[var(--text-primary-color)] leading-relaxed">
                  {t("about-us-page.message2")}
                </p>
              </section>
            </div>
          </article>

          <article className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-5 items-center mt-8">
            <div className="space-y-6 order-last lg:order-first">
              <section>
                <h2 className="text-2xl text-[var(--text-primary-color)] font-semibold">
                  {t("about-us-page.title3")}
                </h2>
                <p className="text-[var(--text-primary-color)] leading-relaxed">
                  {t("about-us-page.message3")}
                </p>
              </section>

              <section>
                <h2 className="text-2xl text-[var(--text-primary-color)] font-semibold">
                  {t("about-us-page.title4")}
                </h2>
                <p className="text-[var(--text-primary-color)] leading-relaxed">
                  {t("about-us-page.message4")}
                </p>
              </section>
            </div>

            <figure className="flex">
              <Image
                src="/images/about-2.svg"
                alt="Global Finance"
                width={300}
                height={300}
                className="w-full max-w-xs"
              />
              {/* <figcaption>Global Finance illustration</figcaption> */}
            </figure>
          </article>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
