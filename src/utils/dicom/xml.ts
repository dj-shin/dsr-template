import { NativeDicomModel } from './nativeModel';
import * as assert from 'assert';

class DicomParser {
    static parse(xmlString: string): NativeDicomModel {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        assert.equal(xmlDoc.childElementCount, 1);
        const root = xmlDoc.children[0];
        return NativeDicomModel.parse(root);
    }
}

export function test() {
    const dicomString = `<?xml version="1.0" encoding="UTF-8"?>
<NativeDicomModel xml:space="preserve">
  <DicomAttribute keyword="FileMetaInformationVersion" tag="00020001" vr="OB">
    <InlineBinary>AAE=</InlineBinary>
  </DicomAttribute>
  <DicomAttribute keyword="MediaStorageSOPClassUID" tag="00020002" vr="UI">
    <Value number="1">1.2.840.10008.5.1.4.1.1.88.11</Value>
  </DicomAttribute>
  <DicomAttribute keyword="MediaStorageSOPInstanceUID" tag="00020003" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.1.4.2155604110.4180.1021041295.20</Value>
  </DicomAttribute>
  <DicomAttribute keyword="TransferSyntaxUID" tag="00020010" vr="UI">
    <Value number="1">1.2.840.10008.1.2.1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ImplementationClassUID" tag="00020012" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.0.3.5.1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ImplementationVersionName" tag="00020013" vr="SH">
    <Value number="1">OFFIS_DCMTK_351</Value>
  </DicomAttribute>
  <DicomAttribute keyword="InstanceCreationDate" tag="00080012" vr="DA">
    <Value number="1">20020510</Value>
  </DicomAttribute>
  <DicomAttribute keyword="InstanceCreationTime" tag="00080013" vr="TM">
    <Value number="1">163455</Value>
  </DicomAttribute>
  <DicomAttribute keyword="InstanceCreatorUID" tag="00080014" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.0.3.5.1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="SOPClassUID" tag="00080016" vr="UI">
    <Value number="1">1.2.840.10008.5.1.4.1.1.88.11</Value>
  </DicomAttribute>
  <DicomAttribute keyword="SOPInstanceUID" tag="00080018" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.1.4.2155604110.4180.1021041295.20</Value>
  </DicomAttribute>
  <DicomAttribute keyword="StudyDate" tag="00080020" vr="DA"/>
  <DicomAttribute keyword="ContentDate" tag="00080023" vr="DA">
    <Value number="1">20020510</Value>
  </DicomAttribute>
  <DicomAttribute keyword="StudyTime" tag="00080030" vr="TM"/>
  <DicomAttribute keyword="ContentTime" tag="00080033" vr="TM">
    <Value number="1">163455</Value>
  </DicomAttribute>
  <DicomAttribute keyword="AccessionNumber" tag="00080050" vr="SH"/>
  <DicomAttribute keyword="Modality" tag="00080060" vr="CS">
    <Value number="1">SR</Value>
  </DicomAttribute>
  <DicomAttribute keyword="Manufacturer" tag="00080070" vr="LO"/>
  <DicomAttribute keyword="ReferringPhysicianName" tag="00080090" vr="PN">
    <PersonName number="1">
      <Alphabetic>
        <FamilyName>Fukuda</FamilyName>
        <GivenName>Katherine M.</GivenName>
        <NameSuffix>M. D.</NameSuffix>
      </Alphabetic>
    </PersonName>
  </DicomAttribute>
  <DicomAttribute keyword="StudyDescription" tag="00081030" vr="LO">
    <Value number="1">OFFIS Structured Reporting Samples</Value>
  </DicomAttribute>
  <DicomAttribute keyword="SeriesDescription" tag="0008103E" vr="LO">
    <Value number="1">Basic Text Report</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ReferencedPerformedProcedureStepSequence" tag="00081111" vr="SQ"/>
  <DicomAttribute keyword="PatientName" tag="00100010" vr="PN">
    <PersonName number="1">
      <Alphabetic>
        <FamilyName>Osterman</FamilyName>
        <GivenName>Phillip</GivenName>
        <MiddleName>B.</MiddleName>
      </Alphabetic>
    </PersonName>
  </DicomAttribute>
  <DicomAttribute keyword="PatientID" tag="00100020" vr="LO"/>
  <DicomAttribute keyword="PatientBirthDate" tag="00100030" vr="DA">
    <Value number="1">19220909</Value>
  </DicomAttribute>
  <DicomAttribute keyword="PatientSex" tag="00100040" vr="CS">
    <Value number="1">M</Value>
  </DicomAttribute>
  <DicomAttribute keyword="StudyInstanceUID" tag="0020000D" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.1.2.2155604110.4180.1021041295.21</Value>
  </DicomAttribute>
  <DicomAttribute keyword="SeriesInstanceUID" tag="0020000E" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.1.3.2155604110.4180.1021041295.22</Value>
  </DicomAttribute>
  <DicomAttribute keyword="StudyID" tag="00200010" vr="SH"/>
  <DicomAttribute keyword="SeriesNumber" tag="00200011" vr="IS">
    <Value number="1">1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="InstanceNumber" tag="00200013" vr="IS">
    <Value number="1">1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
    <Value number="1">CONTAINER</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
    <Item number="1">
      <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
        <Value number="1">DT.06</Value>
      </DicomAttribute>
      <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
        <Value number="1">99_OFFIS_DCMTK</Value>
      </DicomAttribute>
      <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
        <Value number="1">Consultation Report</Value>
      </DicomAttribute>
      <DicomAttribute keyword="CodingSchemeUID" tag="0008010C" vr="UI">
        <Value number="1">1.2.276.0.7230010.3.0.0.1</Value>
      </DicomAttribute>
    </Item>
  </DicomAttribute>
  <DicomAttribute keyword="ContinuityOfContent" tag="0040A050" vr="CS">
    <Value number="1">SEPARATE</Value>
  </DicomAttribute>
  <DicomAttribute keyword="PerformedProcedureCodeSequence" tag="0040A372" vr="SQ"/>
  <DicomAttribute keyword="CompletionFlag" tag="0040A491" vr="CS">
    <Value number="1">PARTIAL</Value>
  </DicomAttribute>
  <DicomAttribute keyword="VerificationFlag" tag="0040A493" vr="CS">
    <Value number="1">UNVERIFIED</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ContentSequence" tag="0040A730" vr="SQ">
    <Item number="1">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">HAS OBS CONTEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">PNAME</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">IHE.04</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">99_OFFIS_DCMTK</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Observer Name</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeUID" tag="0008010C" vr="UI">
            <Value number="1">1.2.276.0.7230010.3.0.0.1</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="PersonName" tag="0040A123" vr="PN">
        <PersonName number="1">
          <Alphabetic>
            <FamilyName>Packer</FamilyName>
            <GivenName>David M.</GivenName>
            <NameSuffix>M. D.</NameSuffix>
          </Alphabetic>
        </PersonName>
      </DicomAttribute>
    </Item>
    <Item number="2">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">HAS OBS CONTEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">TEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">IHE.05</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">99_OFFIS_DCMTK</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Observer Organization Name</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeUID" tag="0008010C" vr="UI">
            <Value number="1">1.2.276.0.7230010.3.0.0.1</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="TextValue" tag="0040A160" vr="UT">
        <Value number="1">Redlands Clinic</Value>
      </DicomAttribute>
    </Item>
    <Item number="3">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">CONTAINS</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">TEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">CODE_01</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">99_OFFIS_DCMTK</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Description</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeUID" tag="0008010C" vr="UI">
            <Value number="1">1.2.276.0.7230010.3.0.0.1</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="TextValue" tag="0040A160" vr="UT">
        <Value number="1">This 78-year-old gentleman referred by Dr. Fukuda was also seen by Dr. Mason at the Redlands Clinic. He has been seen in the past by Dr. Klugman.
The patient developed a lesion in the concha of the left external ear. Recent biopsy confirmed this as being a squamous cell carcinoma. The patient has had a few other skin cancers.
Of most significant past history is the fact that this patient has a leukemia that has been treated in standard fashion by Dr. Klugman. The patient was then transferred to the Redlands Clinic and by some experimental protocol which, I guess, includes some sort of lymphocyte electrophoresis, has been placed into remission. He is not currently on any antileukemia drugs and has responded extremely well to his medical management.
On examination, the patient is healthy in general appearance. There is a 1.5 cm lesion on the concha of the ear, which is seen well on photograph of the left external ear. There are numerous soft lymph nodes in both sides of the neck, which I presume are related to his leukemia.</Value>
      </DicomAttribute>
    </Item>
    <Item number="4">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">CONTAINS</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">TEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">CODE_02</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">99_OFFIS_DCMTK</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Diagnosis</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeUID" tag="0008010C" vr="UI">
            <Value number="1">1.2.276.0.7230010.3.0.0.1</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="TextValue" tag="0040A160" vr="UT">
        <Value number="1">Squamous cell carcinoma, relatively superficial, involving the skin of the left external ear, which is seen well on photograph of the left external ear.</Value>
      </DicomAttribute>
    </Item>
    <Item number="5">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">CONTAINS</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">TEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">CODE_03</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">99_OFFIS_DCMTK</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Treatment</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeUID" tag="0008010C" vr="UI">
            <Value number="1">1.2.276.0.7230010.3.0.0.1</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="TextValue" tag="0040A160" vr="UT">
        <Value number="1">The plan of treatment is as follows: 4500 rad, 15 treatment sessions, using 100 kV radiation.
The reason for treatment, expected acute reaction, and remote possibility of complication was discussed with this patient at some length, and he accepted therapy as outlined.</Value>
      </DicomAttribute>
    </Item>
  </DicomAttribute>
</NativeDicomModel>`;

    let model = DicomParser.parse(dicomString);

    for (let i = 0; i < 1; i++) {
        const doc = document.implementation.createDocument(null, null, null);
        model.deserialize(doc);

        model = NativeDicomModel.parse(doc.children[0]);
    }
}
