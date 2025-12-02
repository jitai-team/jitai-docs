import React from "react";
import PageLayout from "@site/src/components/PageLayout";
import ContactSection from "@site/src/components/CompsContact/ContactSection";
import styles from "./contact.module.css";

const ContactPage: React.FC = () => {
    return (
        <PageLayout pageId="contact" containerClassName={styles.pageContainer}>
            <ContactSection />
        </PageLayout>
    );
};

export default ContactPage;
