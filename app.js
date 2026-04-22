const CASES = [
  {
    id: "VET-24017",
    veteranName: "Michael Turner",
    claimType: "Disability Compensation",
    status: "Awaiting Review",
    priority: "High",
    daysInQueue: 45,
    slaAtRisk: true,
    nextStep: "Review recommendation and determine whether additional evidence is required.",
    subtitle:
      "Primary case routed for final eligibility and evidence sufficiency review.",
    summary:
      "Claim intake, record gathering, and verification are complete. The record is assembled for final determination and evidence sufficiency review.",
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
      riskIndicator: "Medium",
      confidence: "82%",
      readiness: "Needs Review",
      rationale:
        "Core eligibility, service alignment, and supporting medical evidence are present. Specialist validation remains the primary factor affecting final confidence.",
    },
    keyDrivers: [
      "Service history verified",
      "Medical evidence supports the claimed condition",
      "Missing specialist validation may affect final confidence",
      "No conflicting evidence identified in current records",
    ],
    keyInsights: [
      "Service history verified",
      "Diagnosis confirmed",
      "Supporting medical opinion present",
      "No conflicting evidence identified",
    ],
    recommendationDraft:
      "Proceed with claim. Current records support an initial determination, with specialist validation available if additional corroboration is required.",
    documentsReceived: [
      "DD-214",
      "Compensation claim form",
      "Medical records PDF",
      "Physician statement",
      "Service verification result",
    ],
    systemsChecked: [
      "Service history verification service",
      "Prior claim and decision history",
      "Document intake and classification records",
      "Medical record ingestion workflow",
    ],
    automationOutcomes: [
      "Fields auto-filled across claim, service, and medical record systems",
      "Service dates cross-checked against verification records",
      "Prior claim history synchronized with the current file",
      "Medical evidence mapped to claim conditions and supporting statements",
      "Claim form data extracted",
      "Medical evidence indexed",
      "Prior claim history matched",
      "Recommendation draft prepared",
    ],
    policyCompliance: [
      { label: "Eligibility criteria", status: "Met" },
      { label: "Service requirements", status: "Met" },
      { label: "Evidence sufficiency threshold", status: "Needs Review" },
    ],
    remainingReview: [
      "Confirm recommendation against record findings",
      "Validate whether specialist evidence is necessary",
      "Finalize disposition or request additional evidence",
    ],
    attachments: [
      {
        title: "DD-214",
        type: "Military separation record",
        updated: "Received April 2, 2026",
        summary:
          "Separation record confirms period of active duty service and discharge characterization used for eligibility review.",
      },
      {
        title: "Compensation claim form",
        type: "Initial claim submission",
        updated: "Parsed April 3, 2026",
        summary:
          "Submitted claim identifies the disability compensation request, onset timeline, and supporting treatment sources.",
      },
      {
        title: "Medical records PDF",
        type: "Clinical records",
        updated: "Ingested April 4, 2026",
        summary:
          "Consolidated treatment documentation includes encounter notes, diagnostic findings, and relevant follow-up care.",
      },
      {
        title: "Physician statement",
        type: "Medical opinion",
        updated: "Received April 5, 2026",
        summary:
          "Statement outlines the physician's assessment of condition severity and links ongoing symptoms to documented treatment history.",
      },
      {
        title: "Service verification result",
        type: "Verification outcome",
        updated: "Completed April 5, 2026",
        summary:
          "Verification output confirms service dates and record match status for use in claim adjudication.",
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
        <p class="summary-item-label">Current Status</p>
        <p class="summary-item-value">${caseRecord.status}</p>
      </article>
      <article class="detail-card detail-card--summary-tile">
        <p class="summary-item-label">Priority</p>
        <p class="summary-item-value">${caseRecord.priority}</p>
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

      <article class="detail-card">
        <h2>Policy / Compliance Status</h2>
        <div class="compliance-list">
          ${caseRecord.policyCompliance
            .map(
              (check) => `
                <div class="compliance-item">
                  <span>${check.label}</span>
                  <span class="status-pill status-pill--${check.status.toLowerCase().replace(/\s+/g, "-")}">${check.status}</span>
                </div>
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
