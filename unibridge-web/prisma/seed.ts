import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding UniBridge Database for SIH 2026 PS 26044 (Ministry of Ayush & AIIA)...');

  // Clean existing tables to avoid duplicate accumulation
  await prisma.placementPipeline.deleteMany({});
  await prisma.skillGapTelemetry.deleteMany({});
  await prisma.courseOutcome.deleteMany({});
  await prisma.problemStatement.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Seed Tri-Partite Users
  await prisma.user.create({
    data: {
      email: 'aarav.sharma@ayush.edu.in',
      name: 'Aarav Sharma',
      role: 'STUDENT',
      department: 'Ayush Health Informatics',
      institution: 'All India Institute of Ayurveda (AIIA)',
      skills: 'Python, PyTorch, OpenCV, Next.js, FHIR Standards, Microservices',
    },
  });

  await prisma.user.create({
    data: {
      email: 'dr.ramanujan@aiia.gov.in',
      name: 'Prof. Dr. S. Ramanujan (Dean Academics)',
      role: 'FACULTY',
      department: 'Botany & Ayush Pharmacognosy',
      institution: 'All India Institute of Ayurveda (AIIA)',
      skills: 'Ayush Telemetry, Botanical Pattern Analytics, FHIR Standards',
    },
  });

  await prisma.user.create({
    data: {
      email: 'rd.lead@dabur-ayush.com',
      name: 'Dr. Vikram Mehta (Head of Botanical R&D)',
      role: 'INDUSTRY_PARTNER',
      department: 'Herb Quality Automation & Traceability',
      institution: 'Dabur R&D Labs & AIIA Research Center',
      skills: 'Spectral Imaging, Herb Authenticity, Supply Chain Provenance',
    },
  });

  // 2. Seed 4 Ministry of Ayush & AIIA Industry Challenges (PS 26044)
  await prisma.problemStatement.create({
    data: {
      title: 'Computer Vision Botanical Adulteration & Raw Herb Authentication',
      companyName: 'All India Institute of Ayurveda & Dabur R&D',
      description: 'Develop deep learning spectral pattern recognition & computer vision models to authenticate raw Ayurvedic botanical herbs and detect microscopic adulterants in commercial herbal formulations at inspection centers.',
      requiredSkills: 'Python, PyTorch, OpenCV, Spectral Imaging, ResNet',
      targetDeliverables: 'Herb authentication model checkpoint, spectral image preprocessing pipeline, FastAPI inference endpoint',
      difficulty: 'ADVANCED',
      timelineWeeks: 12,
      mentorshipAvailable: true,
      targetAudience: 'Student Capstone / Research Lab',
    },
  });

  await prisma.problemStatement.create({
    data: {
      title: 'IoT Sensor Telemetry for Automated Temperature & Fermentation Control in Asava/Arishta Formulations',
      companyName: 'Baidyanath Ayurvedic Labs',
      description: 'Deploy an automated ESP32 IoT telemetry sensor network monitoring real-time temperature, pH, and Brix levels during classical fermentation of Ayurvedic Asava and Arishta formulations.',
      requiredSkills: 'Embedded C++, MQTT, FreeRTOS, ESP32, Time-Series DB',
      targetDeliverables: 'ESP32 micro-controller sensor array schematic, automated temperature/pH monitoring firmware, time-series telemetry dashboard',
      difficulty: 'INTERMEDIATE',
      timelineWeeks: 10,
      mentorshipAvailable: true,
      targetAudience: 'Capstone Team',
    },
  });

  await prisma.problemStatement.create({
    data: {
      title: 'Ayush EHR: FHIR/ABDM Standardized Clinical Telemetry & Prakriti Assessment Engine',
      companyName: 'Ministry of Ayush Digital Health Mission',
      description: 'Build a standardized FHIR HL7 & ABDM compliant microservice platform for digital clinical telemetry and automated Prakriti (Tridosha) constitutional diagnosis for rural health centers.',
      requiredSkills: 'Next.js, Node.js, PostgreSQL, FHIR Standards, Microservices',
      targetDeliverables: 'FHIR R4 resource mapper, Prakriti assessment microservice, doctor diagnostic dashboard',
      difficulty: 'ADVANCED',
      timelineWeeks: 12,
      mentorshipAvailable: true,
      targetAudience: 'Individual / Capstone Team',
    },
  });

  await prisma.problemStatement.create({
    data: {
      title: 'Supply Chain Provenance & Traceability for Medicinal Herb Cultivators using Geo-Tagging',
      companyName: 'National Medicinal Plants Board - NMPB',
      description: 'Implement a mobile GIS geo-tagging application and provenance ledger to trace raw medicinal herbs from remote tribal farmer harvests to certified Ayush manufacturing facilities.',
      requiredSkills: 'React Native, Leaflet/GIS, Python FastAPI, PostgreSQL',
      targetDeliverables: 'Offline-first mobile GIS field app, batch provenance API, interactive supply chain map portal',
      difficulty: 'INTERMEDIATE',
      timelineWeeks: 10,
      mentorshipAvailable: true,
      targetAudience: 'Student Team',
    },
  });

  // 3. Seed 3 University Curriculum Course Outcomes
  await prisma.courseOutcome.create({
    data: {
      department: 'Ayush Health Informatics',
      courseName: 'AY401: Digital Health Records, FHIR Standards & Ayush Informatics',
      semester: 7,
      learningOutcomes: 'Architect ABDM-compliant FHIR HL7 electronic health record schemas; Develop Prakriti questionnaire microservices with standardized diagnostic telemetry; Implement end-to-end clinical data encryption and interoperability.',
      prerequisiteSkills: 'Next.js, Node.js, PostgreSQL, FHIR Standards',
    },
  });

  await prisma.courseOutcome.create({
    data: {
      department: 'Computer Science & AI',
      courseName: 'CS308: Applied Computer Vision & Botanical Pattern Recognition',
      semester: 6,
      learningOutcomes: 'Train deep convolutional neural networks (ResNet, Vision Transformers) for botanical sample authentication; Preprocess multispectral imaging data for herbal adulteration detection; Deploy ONNX edge inference models for field identification.',
      prerequisiteSkills: 'Python, PyTorch, OpenCV, Spectral Imaging',
    },
  });

  await prisma.courseOutcome.create({
    data: {
      department: 'Electronics & Communication',
      courseName: 'EC304: IoT Edge Telemetry, Sensors & Industrial Microcontrollers',
      semester: 6,
      learningOutcomes: 'Program ESP32 microcontrollers with FreeRTOS real-time task schedulers; Implement low-latency MQTT telemetry protocol over industrial cellular gateways; Build time-series database ingestion pipelines for continuous process monitoring.',
      prerequisiteSkills: 'Embedded C++, MQTT, FreeRTOS, ESP32',
    },
  });

  // 4. Seed Curriculum Skill-Gap Telemetry Items
  await prisma.skillGapTelemetry.create({
    data: {
      department: 'Ayush Health Informatics',
      academicYear: '2025-2026',
      skillDeficiency: 'Deficit identified in FHIR/ABDM standards integration within Semester 6 coursework',
      missingTools: 'FHIR Standards, ABDM Sandbox APIs, Clinical Data Security',
      aggregateDeficitScore: 42.5,
      curriculumRecommendation: 'Incorporate practical ABDM sandbox API labs and FHIR HL7 payload validation modules in AY401 syllabus for Semester 6.',
      status: 'FLAGGED',
    },
  });

  await prisma.skillGapTelemetry.create({
    data: {
      department: 'Computer Science & AI',
      academicYear: '2025-2026',
      skillDeficiency: 'Absence of Multispectral & Hyperspectral Image Preprocessing Modules',
      missingTools: 'Spectral Imaging, PyTorch Vision Transformers, OpenCV CUDA',
      aggregateDeficitScore: 38.0,
      curriculumRecommendation: 'Add multispectral image filtering and PyTorch TensorRT edge deployment practicals to CS308 course outcomes.',
      status: 'UNDER_REVIEW',
    },
  });

  await prisma.skillGapTelemetry.create({
    data: {
      department: 'Electronics & Communication',
      academicYear: '2025-2026',
      skillDeficiency: 'Limited Real-Time OS FreeRTOS Task Scheduling & Time-Series DB Experience',
      missingTools: 'FreeRTOS, MQTT TLS, InfluxDB Time-Series',
      aggregateDeficitScore: 35.2,
      curriculumRecommendation: 'Upgrade EC304 lab assignments from single-threaded microcontrollers to FreeRTOS ESP32 multi-tasking architecture.',
      status: 'INTEGRATED',
    },
  });

  // 5. Seed Placement & Internship Pipeline Records
  await prisma.placementPipeline.create({
    data: {
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@ayush.edu.in',
      challengeTitle: 'Ayush EHR: FHIR/ABDM Standardized Clinical Telemetry & Prakriti Assessment Engine',
      companyName: 'Ministry of Ayush Digital Health Mission',
      capstoneScore: 94.5,
      internshipStatus: 'ACCREDITED_INTERNSHIP',
      ppoStatus: 'PPO_OFFERED',
      accreditedCredits: '4 NEP Credits (A+ Grade)',
      verifiedHash: '0x8F92A7C1E4B920A4DF1200A19842C3',
    },
  });

  await prisma.placementPipeline.create({
    data: {
      studentName: 'Priya Patel',
      studentEmail: 'priya.patel@ayush.edu.in',
      challengeTitle: 'Computer Vision Botanical Adulteration & Raw Herb Authentication',
      companyName: 'All India Institute of Ayurveda & Dabur R&D',
      capstoneScore: 91.0,
      internshipStatus: 'ACCREDITED_INTERNSHIP',
      ppoStatus: 'INTERNSHIP_ACTIVE',
      accreditedCredits: '4 NEP Credits (A Grade)',
      verifiedHash: '0x7E31D4A9F8120BC583190A81729C44',
    },
  });

  await prisma.placementPipeline.create({
    data: {
      studentName: 'Rohan Verma',
      studentEmail: 'rohan.verma@ayush.edu.in',
      challengeTitle: 'IoT Sensor Telemetry for Automated Temperature & Fermentation Control in Asava/Arishta Formulations',
      companyName: 'Baidyanath Ayurvedic Labs',
      capstoneScore: 88.5,
      internshipStatus: 'ACCREDITED_INTERNSHIP',
      ppoStatus: 'PPO_OFFERED',
      accreditedCredits: '3 NEP Credits (A Grade)',
      verifiedHash: '0x9C44F2B8D701A528E44109183B7651',
    },
  });

  console.log('UniBridge Database seeded successfully with Ministry of Ayush & AIIA domain data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
