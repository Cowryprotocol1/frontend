import React, {useEffect} from 'react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import type { NextPageWithLayout } from "./_app";

const url:string = 'https://cowry-backend.herokuapp.com/audit_protocol';

const redirectToAlternative=(url:string)=>{
    window.location.href =url
}

const AuditProtocol: NextPageWithLayout = () => {
    useEffect(() => {
        redirectToAlternative(url)
    }, [])
    
  return (
    <Layout>
      <Seo templateTitle='Not Found' />
    </Layout>
  );
};
AuditProtocol.getLayout = (page) => <Layout>{page}</Layout>;
export default AuditProtocol;