import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CrawlerOptic's Privacy Policy — how we collect, use, and protect your data.",
};

const LAST_UPDATED = "March 1, 2026";
const COMPANY = "CrawlerOptic";
const CONTACT_EMAIL = "privacy@crawleroptic.com";
const SITE_URL = "https://crawleroptic.com";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="py-12 border-b border-outline-variant/10 mb-10">
          <span className="text-[10px] uppercase tracking-widest text-secondary font-label block mb-3">
            Legal
          </span>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-on-surface mb-3">
            Privacy Policy
          </h1>
          <p className="text-on-surface-variant">
            Last updated:{" "}
            <span className="text-on-surface">{LAST_UPDATED}</span>
          </p>
        </div>

        <div className="blog-prose">
          <p>
            This Privacy Policy describes how {COMPANY} (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
            information when you use our website at{" "}
            <a href={SITE_URL}>{SITE_URL}</a> (the &ldquo;Service&rdquo;).
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>
            When you use our Service, you may provide us with URLs that you
            wish to analyze. We process these URLs to generate{" "}
            <code>llms.txt</code> files but do not store them beyond the
            duration of your session unless you explicitly save results.
          </p>
          <p>
            If you subscribe to our newsletter or contact us, we collect your
            email address and any information you voluntarily provide.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            Like most websites, we automatically collect certain information
            when you visit the Service, including:
          </p>
          <ul>
            <li>
              <strong>Log data:</strong> IP address, browser type, browser
              version, pages visited, time and date of your visit, time spent
              on pages, and referring URL.
            </li>
            <li>
              <strong>Cookies and similar technologies:</strong> We use cookies
              to enhance your experience. See Section 5 for details.
            </li>
            <li>
              <strong>Usage data:</strong> Aggregated, anonymized data about
              how users interact with the Service.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve the Service</li>
            <li>Process URLs and generate <code>llms.txt</code> files</li>
            <li>
              Send you newsletters or promotional materials, if you have opted
              in
            </li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze usage patterns to improve user experience</li>
            <li>Detect and prevent fraudulent or abusive activity</li>
            <li>Comply with legal obligations</li>
            <li>
              Serve relevant advertisements through Google AdSense (see Section
              6)
            </li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share information in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party vendors who assist us in operating the Service (e.g.,
              hosting providers, analytics services).
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information
              if required by law or in good-faith belief that such action is
              necessary to comply with legal processes.
            </li>
            <li>
              <strong>Business Transfers:</strong> If {COMPANY} is acquired or
              merges with another company, your information may be transferred
              as part of that transaction.
            </li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain log data for up to 90 days. URL data submitted for
            analysis is not persistently stored beyond your active session.
            Email addresses collected through newsletter subscriptions are
            retained until you unsubscribe.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use the following types of cookies:
          </p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Required for the Service to
              function. Cannot be disabled.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Help us understand how
              visitors use the Service. These are anonymized and aggregated.
            </li>
            <li>
              <strong>Advertising cookies:</strong> Used by Google AdSense to
              serve relevant advertisements. See Section 6.
            </li>
          </ul>
          <p>
            You can control cookie preferences through your browser settings.
            Note that disabling certain cookies may affect Service
            functionality.
          </p>

          <h2>6. Google AdSense and Advertising</h2>
          <p>
            We use Google AdSense to display advertisements on the Service.
            Google AdSense uses cookies and web beacons to collect data about
            your activity on this and other websites to provide you with
            targeted advertising.
          </p>
          <p>
            Google&apos;s use of advertising cookies enables it and its
            partners to serve ads based on your visit to the Service and other
            sites on the Internet. You may opt out of personalized advertising
            by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </p>
          <p>
            For more information about how Google uses data from sites that use
            its advertising services, visit{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Privacy & Terms
            </a>
            .
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Request restriction of processing</li>
            <li>Data portability</li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            The Service is not directed to children under 13. We do not
            knowingly collect personal information from children under 13. If
            you believe a child has provided us with personal information,
            please contact us immediately.
          </p>

          <h2>9. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries
            other than your own. We ensure appropriate safeguards are in place
            to protect your information in accordance with applicable law.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new policy on this page
            and updating the &ldquo;Last updated&rdquo; date. Continued use of
            the Service after changes constitutes acceptance of the updated
            policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy
            practices, please contact us at:
          </p>
          <p>
            <strong>{COMPANY}</strong>
            <br />
            Email:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <br />
            Website: <a href={SITE_URL}>{SITE_URL}</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
