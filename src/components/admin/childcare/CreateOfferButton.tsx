
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Child } from '@/types/childcare';
import OfferCreationModal from './OfferCreationModal';
import { useToast } from '@/hooks/use-toast';

interface CreateOfferButtonProps {
  childData: Child;
  serviceType: 'childcare' | 'afterschool';
  className?: string;
}

const CreateOfferButton = ({ childData, serviceType, className }: CreateOfferButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleOfferCreated = (offerData: any) => {
    console.log('Offer created:', offerData);
    toast({
      title: "Offer Created Successfully",
      description: `${serviceType === 'childcare' ? 'Childcare' : 'After-school'} offer created for ${childData.fullName}`,
    });
    
    // Here you would typically make an API call to save the offer
    // Example: await createOffer(offerData);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 hover:bg-blue-50 rounded-full ${className}`}
        onClick={() => setIsModalOpen(true)}
        aria-label={`Create ${serviceType} offer for ${childData.fullName}`}
      >
        <Plus className="h-4 w-4 text-blue-600" />
      </Button>

      <OfferCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        childData={childData}
        serviceType={serviceType}
        onOfferCreated={handleOfferCreated}
      />
    </>
  );
};

export default CreateOfferButton;
