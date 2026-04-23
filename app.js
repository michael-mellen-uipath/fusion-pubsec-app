const CASES = [
  {
    id: "VET-24017",
    veteranName: "Michael Turner",
    claimType: "Direct Service Connection",
    status: "Awaiting Review",
    priority: "High",
    daysInQueue: 45,
    slaAtRisk: true,
    nextStep: "Confirm the evidence is sufficient and advance the claim to Rating Preparation.",
    subtitle:
      "Primary case routed for final review on a chronic low back pain service-connection claim.",
    summary:
      "The record contains a current lumbar diagnosis, an in-service back strain event, and a positive nexus opinion. The file appears complete for a rating decision pending specialist approval.",
    caseMetadata: {
      claimId: "CLM-10482",
      examId: "CNP-2026-00045",
      examDate: "April 20, 2026",
    },
    serviceConnectionEvidence: [
      {
        label: "Current Disability",
        summary:
          "Confirmed diagnoses of lumbosacral strain and degenerative arthritis of the lumbar spine, supported by MRI and X-ray findings.",
      },
      {
        label: "In-Service Event",
        summary:
          "Service treatment records document treatment for low back strain in June 2015 after lifting equipment during service.",
      },
      {
        label: "Nexus",
        summary:
          "The C&P examiner found the lumbar condition at least as likely as not related to the in-service back strain, with no stronger post-service cause identified.",
      },
    ],
    caseJourney: {
      currentStep: 3,
      steps: [
        {
          label: "Intake",
          detail: "Claim filed and initial information captured",
        },
        {
          label: "Records",
          detail: "Service and medical records gathered",
        },
        {
          label: "Review",
          detail: "Evidence sufficiency and recommendation under review",
        },
        {
          label: "Decision",
          detail: "Final disposition pending authorization",
        },
      ],
    },
    assessment: {
      recommendedOutcome: "Proceed",
      evidenceSufficiency: "Sufficient",
      riskIndicator: "Low",
      confidence: "94%",
      readiness: "Ready for Decision",
      rationale:
        "All three service-connection elements are supported in the file: current disability, documented in-service back strain, and a favorable 'at least as likely as not' nexus opinion. The DBQ is complete and adequate for rating with no missing items identified.",
    },
    keyDrivers: [
      "DBQ marked complete and adequate for rating with no missing items",
      "Positive nexus opinion supports direct service connection under the required standard",
      "No stronger post-service traumatic cause is identified in the record",
      "Current file supports routing forward to Rating Preparation",
    ],
    keyInsights: [
      "Lumbosacral strain confirmed",
      "Degenerative arthritis of the lumbar spine confirmed",
      "Veteran reports persistent symptoms since service",
      "No stronger post-service cause documented",
    ],
    recommendationDraft:
      "Proceed to rating. Current evidence supports direct service connection for chronic low back pain, including documented in-service onset, current lumbar pathology, and a favorable nexus opinion.",
    documentsReceived: [
      "Service treatment record for June 2015 low back strain",
      "Private medical record with 2024-02-13 MRI",
      "Thoracolumbar spine C&P examination",
      "Medical nexus opinion",
      "Lumbar spine X-ray results",
    ],
    systemsChecked: [
      "Claim intake and document classification records",
      "Service treatment record repository",
      "Private medical evidence ingestion workflow",
      "C&P exam and DBQ results feed",
    ],
    automationOutcomes: [
      "Claim issue mapped to chronic low back pain service-connection review",
      "In-service back strain evidence matched to the claimed condition",
      "Private MRI and lumbar imaging indexed to the same anatomical region",
      "DBQ findings extracted into the rating-readiness summary",
      "Positive nexus opinion linked to the sufficiency recommendation",
      "Functional impact statements summarized for reviewer context",
      "Exam adequacy result synced with the case record",
      "Recommendation draft prepared for specialist approval",
    ],
    policyCompliance: [
      { label: "Eligibility criteria", status: "Met" },
      { label: "Service requirements", status: "Met" },
      { label: "Evidence sufficiency threshold", status: "Met" },
    ],
    remainingReview: [
      "Confirm the favorable nexus opinion supports direct service connection",
      "Validate the file is ready to route to Rating Preparation",
      "Approve the recommendation or document any final follow-up request",
    ],
    attachments: [
      {
        title: "STR - Low back strain",
        type: "Service Treatment Record",
        updated: "Reviewed April 20, 2026",
        summary:
          "Service treatment documentation notes treatment for low back strain after lifting equipment during service in June 2015.",
      },
      {
        title: "Private MRI report",
        type: "Private medical record",
        updated: "Ingested April 20, 2026",
        summary:
          "MRI dated February 13, 2024 documents degenerative disc disease and supports the presence of current lumbar pathology.",
      },
      {
        title: "Thoracolumbar spine DBQ",
        type: "C&P examination",
        updated: "Completed April 20, 2026",
        summary:
          "Exam confirms lumbosacral strain and degenerative arthritis, painful motion, muscle spasm, and functional loss with bending, standing, and lifting.",
      },
      {
        title: "Medical nexus opinion",
        type: "Medical opinion",
        updated: "Signed April 20, 2026",
        summary:
          "Examiner opined the claimed lumbar condition is at least as likely as not related to the documented in-service back strain.",
      },
      {
        title: "Lumbar spine X-ray",
        type: "Diagnostic imaging",
        updated: "Reviewed April 20, 2026",
        summary:
          "Imaging dated February 10, 2025 shows mild multilevel degenerative changes, consistent with the current lumbar diagnoses.",
      },
    ],
  },
  {
    id: "VET-24011",
    veteranName: "Angela Ruiz",
    claimType: "Dependency and Indemnity Compensation",
    status: "Evidence Check",
    priority: "Routine",
    daysInQueue: 18,
    slaAtRisk: false,
    nextStep: "Confirm beneficiary relationship records before routing forward.",
    subtitle: "Supporting case pending supporting records review.",
  },
  {
    id: "VET-24003",
    veteranName: "Robert Jenkins",
    claimType: "Pension",
    status: "Queued",
    priority: "Routine",
    daysInQueue: 9,
    slaAtRisk: false,
    nextStep: "Awaiting assignment after income verification completes.",
    subtitle: "Supporting case currently held in standard queue order.",
  },
  {
    id: "VET-23998",
    veteranName: "Denise Holloway",
    claimType: "Education Benefits",
    status: "Awaiting Review",
    priority: "Medium",
    daysInQueue: 27,
    slaAtRisk: false,
    nextStep: "Validate enrollment documentation against verified school records.",
    subtitle: "Supporting case available after current high-priority work.",
  },
];

function getPage() {
  if (window.location.hash.startsWith("#case")) return "case";
  return "queue";
}

function getCurrentCaseId() {
  const hash = window.location.hash || "";
  const [, query = ""] = hash.split("?");
  const params = new URLSearchParams(query);
  return params.get("id") || CASES[0].id;
}

function navigateToQueue() {
  if (window.location.hash !== "#queue") {
    window.location.hash = "queue";
  } else {
    renderApp();
  }
}

function navigateToCase(caseId) {
  window.location.hash = `case?id=${encodeURIComponent(caseId)}`;
}

function renderQueuePage() {
  const primarySlot = document.getElementById("primary-case-slot");
  const supportingSlot = document.getElementById("supporting-case-slot");
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

  if (!primarySlot || !supportingSlot) {
    return;
  }

  let activeFilter = "all";

  const primaryCase = CASES[0];
  const supportingCases = CASES.slice(1);

  function matchesFilter(caseRecord, filter) {
    if (filter === "all") return true;
    if (filter === "sla-at-risk") return caseRecord.slaAtRisk === true;
    if (filter === "awaiting-review") return caseRecord.status === "Awaiting Review";
    if (filter === "high-priority") return caseRecord.priority === "High";
    if (filter === "evidence-check") return caseRecord.status === "Evidence Check";
    return true;
  }

  function renderPrimaryCard(caseRecord) {
    const isVisible = matchesFilter(caseRecord, activeFilter);

    if (!isVisible) {
      primarySlot.innerHTML = `
        <div class="empty-state">
          The current filter does not include the assigned priority case.
        </div>
      `;
      return;
    }

      primarySlot.innerHTML = `
      <a class="primary-card" href="#case?id=${encodeURIComponent(caseRecord.id)}" data-case-link="${caseRecord.id}" aria-label="Open case ${caseRecord.id} for ${caseRecord.veteranName}">
        <div class="card-headline">
          <div>
            <p class="case-meta-label">Veteran</p>
            <h2 class="case-name">${caseRecord.veteranName}</h2>
          </div>
          <span class="case-id">${caseRecord.id}</span>
        </div>
        <div class="status-cluster">
          <span class="badge badge--accent">${caseRecord.claimType}</span>
          <span class="badge badge--warning">${caseRecord.status}</span>
          <span class="badge badge--neutral">Priority: ${caseRecord.priority}</span>
        </div>
        <div class="next-step">
          <p class="next-step-label">Next Step</p>
          <p>${caseRecord.nextStep}</p>
        </div>
      </a>
    `;
  }

  function renderSupportingCards() {
    const visibleCases = supportingCases.filter((caseRecord) =>
      matchesFilter(caseRecord, activeFilter),
    );

    if (!visibleCases.length) {
      supportingSlot.innerHTML = `
        <div class="empty-state">
          No supporting cases match the current filter.
        </div>
      `;
      return;
    }

    supportingSlot.innerHTML = visibleCases
      .map(
        (caseRecord) => `
          <a class="supporting-card" href="#case?id=${encodeURIComponent(caseRecord.id)}" data-case-link="${caseRecord.id}" aria-label="Open case ${caseRecord.id} for ${caseRecord.veteranName}">
            <div class="supporting-head">
              <div>
                <h3 class="supporting-title">${caseRecord.veteranName}</h3>
                <p class="supporting-subtitle">${caseRecord.claimType}</p>
              </div>
              <span class="case-id">${caseRecord.id}</span>
            </div>
            <div class="inline-badges">
              <span class="badge badge--neutral">${caseRecord.status}</span>
              <span class="badge badge--neutral">Priority: ${caseRecord.priority}</span>
            </div>
            <p class="supporting-note">${caseRecord.nextStep}</p>
          </a>
        `,
      )
      .join("");
  }

  function renderQueue() {
    renderPrimaryCard(primaryCase);
    renderSupportingCards();

    const caseLinks = document.querySelectorAll("[data-case-link]");
    caseLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        navigateToCase(link.dataset.caseLink);
      });
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filterButtons.forEach((chip) => chip.classList.toggle("is-active", chip === button));
      renderQueue();
    });
  });

  renderQueue();
}

function renderCasePage() {
  const caseView = document.getElementById("case-view");
  const title = document.getElementById("case-title");
  const queuePage = document.getElementById("queue-page");
  const casePage = document.getElementById("case-page");

  if (!caseView || !title || !queuePage || !casePage) {
    return;
  }

  queuePage.hidden = true;
  casePage.hidden = false;

  const caseId = getCurrentCaseId();
  const caseRecord = CASES.find((entry) => entry.id === caseId) || CASES[0];

  title.textContent = `${caseRecord.id} - ${caseRecord.veteranName}`;

  const hasFullRecord =
    Array.isArray(caseRecord.documentsReceived) &&
    Array.isArray(caseRecord.keyDrivers) &&
    Array.isArray(caseRecord.keyInsights) &&
    Array.isArray(caseRecord.automationOutcomes) &&
    Array.isArray(caseRecord.policyCompliance) &&
    caseRecord.caseJourney &&
    Array.isArray(caseRecord.caseJourney.steps);

  const evidenceItems = Array.isArray(caseRecord.serviceConnectionEvidence)
    ? caseRecord.serviceConnectionEvidence.filter(
        (item) => item && item.label && item.summary,
      )
    : [];

  if (!hasFullRecord) {
    caseView.innerHTML = `
      <section class="detail-card">
        <h2>Case Summary</h2>
        <div class="summary-grid">
          <article class="summary-item">
            <p class="summary-item-label">Claim Type</p>
            <p class="summary-item-value">${caseRecord.claimType}</p>
          </article>
          <article class="summary-item">
            <p class="summary-item-label">Current Status</p>
            <p class="summary-item-value">${caseRecord.status}</p>
          </article>
          <article class="summary-item">
            <p class="summary-item-label">Priority</p>
            <p class="summary-item-value">${caseRecord.priority}</p>
          </article>
          <article class="summary-item">
            <p class="summary-item-label">Next Step</p>
            <p class="summary-item-value">${caseRecord.nextStep}</p>
          </article>
        </div>
        <p class="record-note" style="margin-top: 18px;">
          A full case record is not currently displayed for this queue item.
        </p>
      </section>
    `;
    return;
  }

  caseView.innerHTML = `
    <section class="detail-card detail-card--progress">
      <div class="case-progress" role="list" aria-label="Case progress">
        ${caseRecord.caseJourney.steps
          .map((step, index) => {
            const stepNumber = index + 1;
            let state = "upcoming";

            if (stepNumber < caseRecord.caseJourney.currentStep) {
              state = "complete";
            } else if (stepNumber === caseRecord.caseJourney.currentStep) {
              state = "current";
            }

            return `
              <div class="progress-step progress-step--${state}" role="listitem" aria-current="${state === "current" ? "step" : "false"}">
                <div class="progress-step-marker" aria-hidden="true">${state === "complete" ? "&#10003;" : ""}</div>
                <p class="progress-step-label">${step.label}</p>
              </div>
            `;
          })
          .join("")}
      </div>
    </section>

    <section class="summary-strip">
      <article class="detail-card detail-card--summary-tile">
        <p class="summary-item-label">Claim Type</p>
        <p class="summary-item-value">${caseRecord.claimType}</p>
      </article>
      <article class="detail-card detail-card--summary-tile">
        <p class="summary-item-label">Claim ID</p>
        <p class="summary-item-value">${caseRecord.caseMetadata?.claimId || caseRecord.id}</p>
      </article>
      <article class="detail-card detail-card--summary-tile">
        <p class="summary-item-label">Exam ID</p>
        <p class="summary-item-value">${caseRecord.caseMetadata?.examId || "N/A"}</p>
      </article>
      <article class="detail-card detail-card--summary-tile">
        <p class="summary-item-label">Days in Queue</p>
        <p class="summary-item-value">${caseRecord.daysInQueue}</p>
      </article>
    </section>

    <section class="detail-grid">
      <article class="detail-card detail-card--decision">
        <div class="decision-summary-head">
          <div>
            <h2>Agent Assessment</h2>
            <p class="record-note">Recommended disposition, evidence posture, and risk profile.</p>
          </div>
          <div class="readiness-indicator readiness-indicator--${caseRecord.assessment.readiness.toLowerCase().replace(/\s+/g, "-")}">
            <span class="readiness-dot" aria-hidden="true"></span>
            <span>${caseRecord.assessment.readiness}</span>
          </div>
        </div>
        <div class="summary-grid">
          <article class="summary-item">
            <p class="summary-item-label">Recommended Outcome</p>
            <p class="summary-item-value">${caseRecord.assessment.recommendedOutcome}</p>
          </article>
          <article class="summary-item">
            <p class="summary-item-label">Evidence Sufficiency</p>
            <p class="summary-item-value">${caseRecord.assessment.evidenceSufficiency}</p>
          </article>
          <article class="summary-item">
            <p class="summary-item-label">Risk Indicator</p>
            <p class="summary-item-value">${caseRecord.assessment.riskIndicator}</p>
          </article>
          <article class="summary-item">
            <p class="summary-item-label">Confidence Score</p>
            <p class="summary-item-value">${caseRecord.assessment.confidence}</p>
          </article>
        </div>
        <div class="driver-list">
          <p class="summary-item-label">Key Drivers</p>
          ${caseRecord.keyDrivers.map((item) => `<div class="driver-item">${item}</div>`).join("")}
        </div>
        <div class="decision-panel" style="margin-top: 18px;">
          <p><strong>${caseRecord.assessment.recommendedOutcome === "Proceed" ? "Proceed with claim" : "Request additional evidence"}</strong></p>
          <p>${caseRecord.assessment.rationale}</p>
        </div>
      </article>

      <article class="detail-card">
        <h2>Open Review Items</h2>
        <ul class="checklist checklist--review">
          ${caseRecord.remainingReview.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="notes-panel">
          <label class="notes-panel-label" for="caseworker-notes">Caseworker Notes</label>
          <textarea
            id="caseworker-notes"
            class="notes-panel-textarea"
            placeholder="Capture key observations, decisions, and follow-ups for this case..."
          ></textarea>
          <div class="notes-panel-files">
            <p class="notes-panel-label">Attach Files</p>
            <div class="notes-panel-upload">
              <input id="case-file-upload" class="notes-panel-file-input" type="file" />
              <label class="notes-panel-file-button" for="case-file-upload">Choose Files</label>
              <span class="notes-panel-file-name">No file chosen</span>
            </div>
            <p class="notes-panel-hint">This uploader is for demo purposes only, files are not persisted.</p>
          </div>
          <div class="notes-panel-actions">
            <button class="action-button action-button--primary" type="button">Approve</button>
            <button class="action-button action-button--secondary" type="button">Request Info</button>
          </div>
        </div>
      </article>

      <article class="detail-card">
        <h2>Documents Received</h2>
        <ul class="checklist checklist--subdued">
          ${caseRecord.documentsReceived.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>

      <article class="detail-card detail-card--evidence">
        <div class="evidence-block-head">
          <div>
            <h2>Service Connection Evidence</h2>
          </div>
        </div>
        <div class="evidence-grid">
          ${evidenceItems
            .map(
              (item) => `
                <article class="evidence-item">
                  <p class="summary-item-label">${item.label}</p>
                  <p class="record-note">${item.summary}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </article>
    </section>
  `;
}

function renderApp() {
  if (getPage() === "queue") {
    const queuePage = document.getElementById("queue-page");
    const casePage = document.getElementById("case-page");
    if (queuePage) queuePage.hidden = false;
    if (casePage) casePage.hidden = true;
    renderQueuePage();
  }

  if (getPage() === "case") {
    renderCasePage();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "queue";
  }
  renderApp();
});

window.addEventListener("hashchange", renderApp);
