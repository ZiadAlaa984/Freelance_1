import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What services do you offer as a freelancer?</AccordionTrigger>
        <AccordionContent>
          I offer a wide range of services including graphic design, web development, writing and editing, translation, digital marketing, and more. You can check my profile for detailed information on the specific services I provide.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How can I contact you to start a project?</AccordionTrigger>
        <AccordionContent>
          You can reach out to me through the contact form on the website or via the email provided on my profile page. I will be happy to respond to your inquiries and discuss project details.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
        <AccordionContent>
          I accept payments via PayPal, bank transfer, and credit cards. If you have a preferred payment method, please let me know and I will do my best to accommodate it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>What is the turnaround time for a project?</AccordionTrigger>
        <AccordionContent>
          The turnaround time depends on the size and complexity of the project. I usually provide time estimates during the initial negotiation phase. I will provide a precise estimate and keep you informed throughout the project progress.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Can I request revisions after the project is delivered?</AccordionTrigger>
        <AccordionContent>
          Yes, I offer free revisions within the scope of the initial agreement. If you require additional revisions after delivery, we can discuss that, and I will follow the applicable pricing policy.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>What quality assurance procedures do you follow?</AccordionTrigger>
        <AccordionContent>
          I adhere to strict quality assurance procedures. This includes thorough review, performance testing, and adherence to best practices in my field. I aim to deliver work that exceeds your expectations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>Do you provide post-delivery support?</AccordionTrigger>
        <AccordionContent>
          Yes, I provide post-delivery support to ensure smooth operation. If you encounter any issues or need additional assistance, I will be here to help.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>Do I need to provide detailed information about the project?</AccordionTrigger>
        <AccordionContent>
          Yes, the more detailed information you provide about the project, the better I can offer a tailored proposal and meet your needs effectively. Feel free to provide any additional information or documents that might assist in the completion of the project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
