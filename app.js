import { UiPath, UiPathError } from "@uipath/uipath-typescript";
import {
  Entities,
  LogicalOperator,
  QueryFilterOperator,
} from "@uipath/uipath-typescript/entities";

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
    maestroLookup: {
      claimType: "Disability Compensation",
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
      "Medical nexus opinion",
      "Thoracolumbar spine C&P examination",
      "Lumbar spine X-ray results",
      "Service treatment record for June 2015 low back strain",
      "Private medical record with 2024-02-13 MRI",
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

const IS_LOCAL_HOST =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const AUTH_CONFIG = {
  clientId: import.meta.env.VITE_UIPATH_CLIENT_ID || "",
  orgName: import.meta.env.VITE_UIPATH_ORG_NAME || "",
  tenantName: import.meta.env.VITE_UIPATH_TENANT_NAME || "",
  baseUrl: import.meta.env.VITE_UIPATH_BASE_URL || "https://cloud.uipath.com",
  redirectUri: IS_LOCAL_HOST
    ? window.location.origin
    : import.meta.env.VITE_UIPATH_REDIRECT_URI || window.location.origin,
  scope: import.meta.env.VITE_UIPATH_SCOPES || import.meta.env.VITE_UIPATH_SCOPE || "",
};

const AUTH_KEYS = {
  returnHash: "fusion_return_hash",
};

const DATA_FABRIC_CONFIG = {
  entityId: "31db233b-ee3c-f111-8ef3-7c1e521935ca",
  entityName: "vaDisabilityClaims",
  claimTypeField: "claimType",
  requiredClaimType: "Disability Compensation",
  maestroFolderField: "maestroFolderId",
  maestroProcessTypeField: "maestroProcessTypeId",
  maestroInstanceField: "maestroProcessInstanceId",
};

const DOCUMENT_VIEWER_CONFIG = {
  entityName: "VetDocs",
  locatorFieldName: "doc",
  locatorFileName: "MEDICAL NEXUS OPINION.pdf",
  documents: {
    "medical-nexus-opinion": {
      fieldName: "doc",
      title: "Medical nexus opinion",
    },
    "thoracolumbar-spine-cp-examination": {
      fieldName: "CPexam",
      title: "Thoracolumbar spine C&P examination",
    },
    "lumbar-spine-xray-results": {
      fieldName: "xray",
      title: "Lumbar spine X-ray results",
    },
  },
};

const DEFAULT_USER = {
  name: "Current User",
  role: "Case Specialist",
  initials: "AU",
};

let sdk = new UiPath(AUTH_CONFIG);

const authState = {
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const maestroState = {
  entityId: null,
  entityIdPromise: null,
  linkByCaseId: new Map(),
  errorByCaseId: new Map(),
  requestByCaseId: new Map(),
};

const documentViewerState = {
  entityId: null,
  entityIdPromise: null,
  recordId: null,
  recordIdPromise: null,
  fileUrlByKey: new Map(),
  current: {
    caseId: null,
    documentKey: null,
    fileName: null,
    title: "",
    url: "",
    status: "idle",
    error: "",
  },
};

function hasAuthConfig() {
  return Boolean(
    AUTH_CONFIG.clientId &&
      AUTH_CONFIG.orgName &&
      AUTH_CONFIG.tenantName &&
      AUTH_CONFIG.redirectUri &&
      AUTH_CONFIG.scope,
  );
}

function updateUserDisplay() {
  const name = document.getElementById("topbar-user-name");
  const role = document.getElementById("topbar-user-role");
  const icon = document.getElementById("topbar-user-icon");

  if (!name || !role || !icon) {
    return;
  }

  if (authState.isAuthenticated) {
    name.textContent = "Authorized User";
    role.textContent = DEFAULT_USER.role;
    icon.textContent = DEFAULT_USER.initials;
    return;
  }

  name.textContent = DEFAULT_USER.name;
  role.textContent = DEFAULT_USER.role;
  icon.textContent = DEFAULT_USER.initials;
}

function updateShellVisibility() {
  const authRoot = document.getElementById("auth-root");
  const appShell = document.getElementById("app-shell");

  if (!authRoot || !appShell) {
    return;
  }

  authRoot.hidden = authState.isAuthenticated;
  appShell.hidden = !authState.isAuthenticated;
  document.body.classList.toggle("auth-active", !authState.isAuthenticated);
  updateUserDisplay();
}

function renderAuthScreen() {
  const authRoot = document.getElementById("auth-root");

  if (!authRoot || authState.isAuthenticated) {
    return;
  }

  const isConfigValid = hasAuthConfig();
  const statusMessage = authState.isLoading
    ? "Connecting to UiPath authentication..."
    : null;
  const configMessage = !isConfigValid
    ? "OAuth configuration is incomplete. Add the required Vite environment values before signing in."
    : null;

  authRoot.innerHTML = `
    <main class="auth-shell">
      <section class="auth-card" aria-labelledby="auth-title">
        <p class="auth-eyebrow">UiPath Sign-In</p>
        <div class="auth-copy">
          <h1 id="auth-title">Secure access to the Veterans Benefits case portal</h1>
          <p>Sign in with UiPath to open the review queue and case workspace.</p>
        </div>
        <ul class="auth-list">
          <li>Organization: ${AUTH_CONFIG.orgName || "Not configured"}</li>
          <li>Tenant: ${AUTH_CONFIG.tenantName || "Not configured"}</li>
          <li>Base URL: ${AUTH_CONFIG.baseUrl || "Not configured"}</li>
          <li>Scopes: ${AUTH_CONFIG.scope || "Not configured"}</li>
        </ul>
        <div class="auth-actions">
          ${
            statusMessage
              ? `<p class="auth-message">${statusMessage}</p>`
              : ""
          }
          ${
            authState.error
              ? `<p class="auth-message auth-message--error">${authState.error}</p>`
              : ""
          }
          ${
            configMessage
              ? `<p class="auth-message auth-message--error">${configMessage}</p>`
              : ""
          }
          <button id="login-button" class="auth-button" type="button" ${
            authState.isLoading || !isConfigValid ? "disabled" : ""
          }>
            ${authState.isLoading ? "Redirecting to UiPath..." : "Login with UiPath"}
          </button>
        </div>
      </section>
    </main>
  `;

  const loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", handleLogin);
  }
}

async function initializeAuth() {
  authState.isLoading = true;
  authState.error = null;
  updateShellVisibility();
  renderAuthScreen();

  if (!hasAuthConfig()) {
    authState.isLoading = false;
    renderAuthScreen();
    return;
  }

  try {
    if (sdk.isInOAuthCallback()) {
      await sdk.completeOAuth();
      const returnHash = sessionStorage.getItem(AUTH_KEYS.returnHash);
      if (returnHash) {
        window.location.hash = returnHash;
        sessionStorage.removeItem(AUTH_KEYS.returnHash);
      }
    }

    authState.isAuthenticated = sdk.isAuthenticated();

    if (authState.isAuthenticated && !window.location.hash) {
      window.location.hash = "queue";
    }
  } catch (error) {
    authState.error =
      error instanceof UiPathError ? error.message : "Authentication failed";
    authState.isAuthenticated = false;
  } finally {
    authState.isLoading = false;
    updateShellVisibility();
    renderAuthScreen();
    if (authState.isAuthenticated) {
      renderApp();
    }
  }
}

async function handleLogin() {
  authState.isLoading = true;
  authState.error = null;
  renderAuthScreen();

  try {
    sessionStorage.setItem(
      AUTH_KEYS.returnHash,
      window.location.hash || "queue",
    );
    await sdk.initialize();
    authState.isAuthenticated = sdk.isAuthenticated();
  } catch (error) {
    authState.error =
      error instanceof UiPathError ? error.message : "Login failed";
    authState.isAuthenticated = false;
  } finally {
    authState.isLoading = false;
    updateShellVisibility();
    renderAuthScreen();
    if (authState.isAuthenticated) {
      renderApp();
    }
  }
}

function handleLogout() {
  sessionStorage.removeItem(`uipath_sdk_user_token-${AUTH_CONFIG.clientId}`);
  sessionStorage.removeItem("uipath_sdk_oauth_context");
  sessionStorage.removeItem("uipath_sdk_code_verifier");
  sessionStorage.removeItem(AUTH_KEYS.returnHash);

  sdk = new UiPath(AUTH_CONFIG);
  authState.isAuthenticated = false;
  authState.isLoading = false;
  authState.error = null;
  window.location.hash = "queue";
  updateShellVisibility();
  renderAuthScreen();
}

async function getDocumentEntityId() {
  if (documentViewerState.entityId) {
    return documentViewerState.entityId;
  }

  if (!documentViewerState.entityIdPromise) {
    documentViewerState.entityIdPromise = (async () => {
      const entities = getEntitiesService();
      const allEntities = await entities.getAll();
      const entity = allEntities.find(
        (entry) =>
          entry.name === DOCUMENT_VIEWER_CONFIG.entityName ||
          entry.displayName === DOCUMENT_VIEWER_CONFIG.entityName,
      );

      if (!entity?.id) {
        throw new Error(
          `Data Fabric entity "${DOCUMENT_VIEWER_CONFIG.entityName}" was not found.`,
        );
      }

      documentViewerState.entityId = entity.id;
      return entity.id;
    })().catch((error) => {
      documentViewerState.entityIdPromise = null;
      throw error;
    });
  }

  return documentViewerState.entityIdPromise;
}

async function getDocumentRecordId() {
  if (documentViewerState.recordId) {
    return documentViewerState.recordId;
  }

  if (!documentViewerState.recordIdPromise) {
    documentViewerState.recordIdPromise = (async () => {
      const entityId = await getDocumentEntityId();
      const entities = getEntitiesService();
      const records = await entities.getAllRecords(entityId, { pageSize: 10 });
      const targetRecord =
        records.items?.find((record) =>
          String(record?.[DOCUMENT_VIEWER_CONFIG.locatorFieldName] || "").includes(
            DOCUMENT_VIEWER_CONFIG.locatorFileName,
          ),
        ) || records.items?.[0];

      if (!targetRecord?.Id) {
        throw new Error(
          `No records were found in "${DOCUMENT_VIEWER_CONFIG.entityName}" for the document viewer.`,
        );
      }

      documentViewerState.recordId = targetRecord.Id;
      return targetRecord.Id;
    })().catch((error) => {
      documentViewerState.recordIdPromise = null;
      throw error;
    });
  }

  return documentViewerState.recordIdPromise;
}

async function getDocumentViewerUrl(documentKey) {
  const documentConfig = DOCUMENT_VIEWER_CONFIG.documents[documentKey];

  if (!documentConfig) {
    throw new Error(`Document viewer key "${documentKey}" is not configured.`);
  }

  const cacheKey = `${DOCUMENT_VIEWER_CONFIG.entityName}::${documentKey}`;

  if (documentViewerState.fileUrlByKey.has(cacheKey)) {
    return documentViewerState.fileUrlByKey.get(cacheKey);
  }

  const entityId = await getDocumentEntityId();
  const recordId = await getDocumentRecordId();
  const entities = getEntitiesService();
  const attachmentBlob = await entities.downloadAttachment(
    entityId,
    recordId,
    documentConfig.fieldName,
  );
  const pdfBlob = new Blob([attachmentBlob], { type: "application/pdf" });
  const objectUrl = URL.createObjectURL(pdfBlob);
  documentViewerState.fileUrlByKey.set(cacheKey, objectUrl);
  return objectUrl;
}

function resetDocumentViewer() {
  for (const objectUrl of documentViewerState.fileUrlByKey.values()) {
    URL.revokeObjectURL(objectUrl);
  }
  documentViewerState.fileUrlByKey.clear();
  documentViewerState.recordId = null;
  documentViewerState.recordIdPromise = null;
  documentViewerState.current = {
    caseId: null,
    documentKey: null,
    fileName: null,
    title: "",
    url: "",
    status: "idle",
    error: "",
  };
}

function closeDocumentViewer() {
  resetDocumentViewer();
  renderDocumentViewer();
}

function renderDocumentViewer() {
  const viewerRoot = document.getElementById("document-viewer-root");
  if (!viewerRoot) {
    return;
  }

  const state = documentViewerState.current;

  if (!state.caseId || !state.documentKey) {
    viewerRoot.hidden = true;
    viewerRoot.innerHTML = "";
    return;
  }

  let bodyMarkup = "";

  if (state.status === "loading") {
    bodyMarkup = `
      <div class="document-viewer-loading">
        Loading the selected document from Orchestrator Storage Buckets...
      </div>
    `;
  } else if (state.status === "error") {
    bodyMarkup = `
      <div class="document-viewer-error">
        ${state.error}
      </div>
    `;
  } else if (state.status === "ready" && state.url) {
    bodyMarkup = `
      <iframe
        class="document-viewer-frame"
        src="${state.url}"
        title="${state.title}"
      ></iframe>
    `;
  }

  viewerRoot.hidden = false;
  viewerRoot.innerHTML = `
    <div class="document-modal-backdrop" data-document-modal-close="true">
      <section
        class="detail-card detail-card--document-viewer document-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-modal-title"
      >
        <div class="document-viewer-head">
          <div>
            <h2 id="document-modal-title">Document Viewer</h2>
            <p class="record-note">${state.title || "Selected case document"}</p>
          </div>
          <div class="document-viewer-actions">
            ${
              state.status === "ready" && state.url
                ? `<a class="action-button action-button--secondary document-viewer-open" href="${state.url}" target="_blank" rel="noopener noreferrer">Open in new tab</a>`
                : ""
            }
            <button class="action-button action-button--secondary" type="button" data-document-modal-close="true">Close</button>
          </div>
        </div>
        ${bodyMarkup}
      </section>
    </div>
  `;

  viewerRoot.querySelectorAll('[data-document-modal-close="true"]').forEach((element) => {
    element.addEventListener("click", (event) => {
      if (
        event.currentTarget === element &&
        element.classList.contains("document-modal-backdrop") &&
        event.target !== element
      ) {
        return;
      }

      closeDocumentViewer();
    });
  });
}

async function openCaseDocument(caseRecord, documentKey) {
  const documentConfig = DOCUMENT_VIEWER_CONFIG.documents[documentKey];

  if (!documentConfig) {
    return;
  }

  documentViewerState.current = {
    caseId: caseRecord.id,
    documentKey,
    fileName: documentConfig.fieldName,
    title: documentConfig.title,
    url: "",
    status: "loading",
    error: "",
  };
  renderDocumentViewer();

  try {
    const readUri = await getDocumentViewerUrl(documentKey);

    if (getCurrentCaseId() !== caseRecord.id) {
      return;
    }

    documentViewerState.current = {
      ...documentViewerState.current,
      url: readUri,
      status: "ready",
      error: "",
    };
  } catch (error) {
    if (getCurrentCaseId() !== caseRecord.id) {
      return;
    }

    documentViewerState.current = {
      ...documentViewerState.current,
      status: "error",
      error:
        error instanceof Error
          ? error.message
          : "Unable to load the selected document.",
    };
  }

  renderDocumentViewer();
}

function getEntitiesService() {
  return new Entities(sdk);
}

function getMaestroLookupClaimType(caseRecord) {
  return (
    caseRecord?.maestroLookup?.claimType || DATA_FABRIC_CONFIG.requiredClaimType
  );
}

function buildMaestroInstanceUrl(record) {
  const folderId = record?.[DATA_FABRIC_CONFIG.maestroFolderField];
  const processTypeId = record?.[DATA_FABRIC_CONFIG.maestroProcessTypeField];
  const processInstanceId = record?.[DATA_FABRIC_CONFIG.maestroInstanceField];

  if (!folderId || !processTypeId || !processInstanceId) {
    throw new Error("The Data Fabric record is missing one or more Maestro identifiers.");
  }

  return `${AUTH_CONFIG.baseUrl}/${encodeURIComponent(
    AUTH_CONFIG.orgName,
  )}/${encodeURIComponent(
    AUTH_CONFIG.tenantName,
  )}/maestro_/processes/${encodeURIComponent(
    processTypeId,
  )}/instances/${encodeURIComponent(processInstanceId)}?folderKey=${encodeURIComponent(
    folderId,
  )}`;
}

function hasCompleteMaestroData(record) {
  return Boolean(
    record?.[DATA_FABRIC_CONFIG.maestroFolderField] &&
      record?.[DATA_FABRIC_CONFIG.maestroProcessTypeField] &&
      record?.[DATA_FABRIC_CONFIG.maestroInstanceField],
  );
}

function getRecordCreatedTimeValue(record) {
  const candidates = [
    record?.CreateTime,
    record?.createTime,
    record?.CreatedTime,
    record?.createdTime,
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const parsed = Date.parse(candidate);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return 0;
}

function pickLatestMaestroRecord(records) {
  if (!Array.isArray(records) || !records.length) {
    return null;
  }

  const validRecords = records.filter(hasCompleteMaestroData);
  if (!validRecords.length) {
    return null;
  }

  return [...validRecords].sort(
    (left, right) =>
      getRecordCreatedTimeValue(right) - getRecordCreatedTimeValue(left),
  )[0];
}

async function getMaestroEntityId() {
  if (maestroState.entityId) {
    return maestroState.entityId;
  }

  if (!maestroState.entityIdPromise) {
    maestroState.entityIdPromise = (async () => {
      if (DATA_FABRIC_CONFIG.entityId) {
        maestroState.entityId = DATA_FABRIC_CONFIG.entityId;
        return DATA_FABRIC_CONFIG.entityId;
      }

      const entities = getEntitiesService();
      const allEntities = await entities.getAll();
      const entity = allEntities.find(
        (entry) =>
          entry.name === DATA_FABRIC_CONFIG.entityName ||
          entry.displayName === DATA_FABRIC_CONFIG.entityName,
      );

      if (!entity?.id) {
        throw new Error(
          `Data Fabric entity "${DATA_FABRIC_CONFIG.entityName}" was not found.`,
        );
      }

      maestroState.entityId = entity.id;
      return entity.id;
    })().catch((error) => {
      maestroState.entityIdPromise = null;
      throw error;
    });
  }

  return maestroState.entityIdPromise;
}

async function getMaestroLink(caseRecord) {
  const lookupClaimType = getMaestroLookupClaimType(caseRecord);

  if (!lookupClaimType) {
    return null;
  }

  if (maestroState.linkByCaseId.has(caseRecord.id)) {
    return maestroState.linkByCaseId.get(caseRecord.id);
  }

  if (!maestroState.requestByCaseId.has(caseRecord.id)) {
    const request = (async () => {
      const entityId = await getMaestroEntityId();
      const entities = getEntitiesService();
      const response = await entities.queryRecordsById(entityId, {
        filterGroup: {
          logicalOperator: LogicalOperator.And,
          queryFilters: [
            {
              fieldName: DATA_FABRIC_CONFIG.claimTypeField,
              operator: QueryFilterOperator.Equals,
              value: lookupClaimType,
            },
            {
              fieldName: DATA_FABRIC_CONFIG.maestroProcessTypeField,
              operator: QueryFilterOperator.NotEquals,
              value: "",
            },
          ],
        },
      });

      const record = pickLatestMaestroRecord(response.items);
      if (!record) {
        throw new Error(
          `No ${DATA_FABRIC_CONFIG.entityName} row matched ${DATA_FABRIC_CONFIG.claimTypeField} "${lookupClaimType}" with populated Maestro identifiers.`,
        );
      }

      const maestroLink = buildMaestroInstanceUrl(record);
      maestroState.linkByCaseId.set(caseRecord.id, maestroLink);
      return maestroLink;
    })()
      .finally(() => {
        maestroState.requestByCaseId.delete(caseRecord.id);
      });

    maestroState.requestByCaseId.set(caseRecord.id, request);
  }

  return maestroState.requestByCaseId.get(caseRecord.id);
}

function setMaestroButtonState({
  hidden = false,
  disabled = false,
  label = "Maestro Instance",
  title = "",
  url = "",
}) {
  const button = document.getElementById("maestro-instance-button");
  if (!button) {
    return;
  }

  button.hidden = hidden;
  button.disabled = disabled;
  button.textContent = label;
  button.title = title;
  button.dataset.maestroUrl = url;
}

function setMaestroDebugMessage(message = "") {
  const debugMessage = document.getElementById("maestro-debug-message");
  if (!debugMessage) {
    return;
  }

  debugMessage.hidden = !message;
  debugMessage.textContent = message;
}

async function updateMaestroButton(caseRecord) {
  const lookupClaimType = getMaestroLookupClaimType(caseRecord);

  if (!lookupClaimType) {
    setMaestroButtonState({ hidden: true });
    setMaestroDebugMessage("");
    return;
  }

  maestroState.errorByCaseId.delete(caseRecord.id);
  setMaestroButtonState({
    hidden: false,
    disabled: true,
    label: "Loading Maestro...",
    title: "Loading live Maestro instance details.",
  });
  setMaestroDebugMessage("");

  try {
    const maestroUrl = await getMaestroLink(caseRecord);
    const activeCaseId = getCurrentCaseId();

    if (caseRecord.id !== activeCaseId) {
      return;
    }

    setMaestroButtonState({
      hidden: false,
      disabled: !maestroUrl,
      label: "Maestro Instance",
      title: maestroUrl
        ? "Open the active Maestro process instance in a new tab."
        : "No active Maestro instance is available for this case.",
      url: maestroUrl || "",
    });
    setMaestroDebugMessage("");
  } catch (error) {
    const activeCaseId = getCurrentCaseId();
    if (caseRecord.id !== activeCaseId) {
      return;
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to load the Maestro instance for this case.";

    maestroState.errorByCaseId.set(caseRecord.id, message);
    console.error("Maestro lookup failed", {
      caseId: caseRecord.id,
      lookupField: DATA_FABRIC_CONFIG.claimTypeField,
      lookupValue: lookupClaimType,
      entityName: DATA_FABRIC_CONFIG.entityName,
      message,
      error,
    });

    setMaestroButtonState({
      hidden: false,
      disabled: true,
      label: "Maestro Unavailable",
      title: message,
    });
    setMaestroDebugMessage(`Maestro debug: ${message}`);
  }
}

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
  void updateMaestroButton(caseRecord);

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

  if (documentViewerState.current.caseId !== caseRecord.id) {
    resetDocumentViewer();
  }

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
          ${caseRecord.documentsReceived
            .map((item) => {
              const isMedicalNexusOpinion =
                caseRecord.id === "VET-24017" &&
                item === "Medical nexus opinion";
              const isCpExam =
                caseRecord.id === "VET-24017" &&
                item === "Thoracolumbar spine C&P examination";
              const isXrayResults =
                caseRecord.id === "VET-24017" &&
                item === "Lumbar spine X-ray results";

              if (!isMedicalNexusOpinion && !isCpExam && !isXrayResults) {
                return `<li>${item}</li>`;
              }

              const documentAction = isMedicalNexusOpinion
                ? "medical-nexus-opinion"
                : isCpExam
                  ? "thoracolumbar-spine-cp-examination"
                  : "lumbar-spine-xray-results";

              return `
                <li class="document-list-item document-list-item--interactive">
                  <button
                    class="document-link-button"
                    type="button"
                    data-document-action="${documentAction}"
                  >
                    <span class="document-link-title">${item}</span>
                  </button>
                </li>
              `;
            })
            .join("")}
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

      <div id="document-viewer-root" class="document-viewer-root" hidden></div>
    </section>
  `;

  caseView.querySelectorAll("[data-document-action]").forEach((button) => {
    button.addEventListener("click", () => {
      void openCaseDocument(caseRecord, button.dataset.documentAction);
    });
  });

  renderDocumentViewer();
}

function renderApp() {
  if (!authState.isAuthenticated) {
    return;
  }

  if (getPage() === "queue") {
    const queuePage = document.getElementById("queue-page");
    const casePage = document.getElementById("case-page");
    if (queuePage) queuePage.hidden = false;
    if (casePage) casePage.hidden = true;
    setMaestroButtonState({ hidden: true });
    setMaestroDebugMessage("");
    closeDocumentViewer();
    renderQueuePage();
  }

  if (getPage() === "case") {
    renderCasePage();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  const maestroButton = document.getElementById("maestro-instance-button");
  if (maestroButton) {
    maestroButton.addEventListener("click", () => {
      const maestroUrl = maestroButton.dataset.maestroUrl;
      if (maestroUrl) {
        window.open(maestroUrl, "_blank", "noopener,noreferrer");
      }
    });
  }

  updateShellVisibility();
  renderAuthScreen();
  void initializeAuth();
});

window.addEventListener("hashchange", () => {
  if (authState.isAuthenticated) {
    renderApp();
  }
});
