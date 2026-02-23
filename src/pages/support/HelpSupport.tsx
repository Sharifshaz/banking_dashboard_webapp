import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SUPPORT_TICKETS } from "@/data/mockData";

export default function HelpSupport() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold">How can we help you?</h1>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input className="pl-10 h-12 text-lg" placeholder="Search for help..." />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer text-center">
          <CardContent className="p-6 pt-8 space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <MessageCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Available 9 AM - 9 PM</p>
            </div>
            <Button className="w-full" variant="outline">Start Chat</Button>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer text-center">
          <CardContent className="p-6 pt-8 space-y-4">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto">
              <Phone className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold">Call Us</h3>
              <p className="text-sm text-muted-foreground">Toll Free 1800-100-NOVA</p>
            </div>
            <Button className="w-full" variant="outline">Call Now</Button>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer text-center">
          <CardContent className="p-6 pt-8 space-y-4">
            <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center mx-auto">
              <Mail className="h-6 w-6 text-sky-600" />
            </div>
            <div>
              <h3 className="font-bold">Email Us</h3>
              <p className="text-sm text-muted-foreground">support@novapay.in</p>
            </div>
            <Button className="w-full" variant="outline">Send Email</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How to reset my MPIN?</AccordionTrigger>
              <AccordionContent>
                Go to Settings &gt; Security &gt; Change MPIN. You will need to verify via OTP sent to your registered mobile number.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why is my transaction pending?</AccordionTrigger>
              <AccordionContent>
                UPI transactions can sometimes be pending due to bank server issues. Usually, they are cleared within 24 hours. If money is deducted but not credited, it will be refunded within 3 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How to enable international usage?</AccordionTrigger>
              <AccordionContent>
                Go to Cards &gt; Select Card &gt; Toggle "International Payments" on. You can also set specific limits for international spend.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What are the charges for IMPS?</AccordionTrigger>
              <AccordionContent>
                IMPS transfers are free for Savings Pro accounts. For standard accounts, charges apply for amounts above ₹2 Lakhs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">My Tickets</h2>
            <Button size="sm" variant="link">View All</Button>
          </div>
          <Card>
             <CardContent className="p-0">
               <Table>
                 <TableBody>
                   {SUPPORT_TICKETS.map((ticket) => (
                     <TableRow key={ticket.id}>
                       <TableCell className="py-3">
                         <p className="font-medium text-sm truncate max-w-[120px]">{ticket.subject}</p>
                         <p className="text-xs text-muted-foreground">{ticket.id}</p>
                       </TableCell>
                       <TableCell className="text-right py-3">
                         <Badge variant={ticket.status === "Resolved" ? "secondary" : ticket.status === "In Progress" ? "outline" : "secondary"} className={
                           ticket.status === "Resolved" ? "bg-emerald-100 text-emerald-700" : 
                           ticket.status === "In Progress" ? "border-amber-500 text-amber-600" : ""
                         }>
                           {ticket.status}
                         </Badge>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </CardContent>
          </Card>
          <Button className="w-full">Raise a Ticket</Button>
        </div>
      </div>
    </div>
  );
}
