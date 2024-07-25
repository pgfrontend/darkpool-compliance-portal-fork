import { NextPage } from "next";
import React from "react";

import { useRouter } from "next/router";
import Head from "next/head";
import ComplianceProvider from "../contexts/ComplianceContext/ComplianceProvider";
import Layout from "../components/Layout";
import { TabPanel } from "../components/Panel/TabPanel";
import CompliancePortal from "../components/Card/CompliancePortal";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Singularity | Compliance Portal</title>
      </Head>
      <ComplianceProvider>
        <Layout title="">
          <CompliancePortal />
        </Layout>
      </ComplianceProvider>
    </div>
  );
};

export default HomePage;
