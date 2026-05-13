# Metrics Strategy

## North Star Metric

The primary North Star metric for SpendScope AI would be:

```txt id="g7m2vx"
Qualified AI infrastructure consultation requests per month
```

This metric matters most because the product is fundamentally a lead-generation engine for Credex rather than a traditional high-frequency SaaS product.

Raw traffic alone is not meaningful if users:

* complete audits casually
* never capture reports
* never require infrastructure-scale purchasing support

The highest-value outcome is identifying startups with meaningful recurring AI spend and converting them into high-intent infrastructure conversations.

---

# Why This Metric Matters

A strong consultation pipeline indicates:

* users trust the audit recommendations
* savings opportunities are believable
* the product is attracting the correct audience
* the GTM strategy is working

It also directly connects product usage to business value rather than vanity engagement metrics.

---

# Input Metrics Driving The North Star

## 1. Audit Completion Rate

```txt id="y5k8pr"
Visitors → Completed audits
```

This measures whether:

* the landing experience is clear
* the form UX feels lightweight
* users understand the value proposition quickly

A low completion rate would suggest:

* too much friction
* unclear positioning
* weak trust signals

---

## 2. Lead Capture Conversion Rate

```txt id="m8r2wn"
Completed audits → Saved reports
```

This is one of the strongest indicators of perceived value.

If users voluntarily save audits after seeing recommendations, it suggests:

* the audit results feel credible
* savings opportunities are meaningful
* users want future optimization updates

---

## 3. Shareable Audit URL Usage

```txt id="u3p7tx"
Public audit shares per completed audit
```

This measures the viral loop potential of the product.

If users publicly share:

* screenshots
* audit links
* savings breakdowns

then the product naturally acquires additional users through founder and developer communities.

This is especially important because the product benefits heavily from organic distribution.

---

# What I Would Instrument First

The first analytics events I would add:

* audit_started
* audit_completed
* report_saved
* consultation_clicked
* public_audit_shared
* high_savings_detected
* AI_summary_generated

These events would allow:

* funnel analysis
* conversion optimization
* recommendation quality analysis
* distribution tracking

---

# Metrics That Would Trigger A Pivot

I would seriously reconsider the product strategy if:

```txt id="c2v9mq"
Lead capture conversion stayed below ~5%
```

after meaningful traffic volume.

That would suggest one of several problems:

* recommendations are not compelling
* savings opportunities feel unrealistic
* users do not trust the audit logic
* the target audience is incorrect

Another concerning signal would be:

* strong traffic
* but very few public audit shares

because the product’s organic distribution model depends heavily on users finding the results interesting enough to discuss publicly.

---

# Metrics I Intentionally Would Not Prioritize

I would avoid over-focusing on:

* DAU
* session time
* raw pageviews

because this is not a daily engagement product.

Most users will likely use the tool:

* occasionally
* during budgeting reviews
* during AI tooling evaluations
* after cost increases

The product succeeds by generating high-quality infrastructure leads, not by maximizing daily usage frequency.
