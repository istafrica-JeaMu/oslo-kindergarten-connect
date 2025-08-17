import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useKindergartenCart } from '@/contexts/KindergartenCartContext';
import { 
  Star, 
  MapPin, 
  GripVertical, 
  ArrowUp, 
  ArrowDown,
  Trophy,
  Target,
  Shuffle,
  Users,
  Clock,
  MapIcon,
  Building
} from 'lucide-react';

const KindergartenPriorityManager = () => {
  const { selectedKindergartens, addKindergarten, removeKindergarten, clearCart } = useKindergartenCart();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveKindergarten = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const newOrder = [...selectedKindergartens];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);
    
    // Update the cart with new order
    clearCart();
    newOrder.forEach(kg => addKindergarten(kg));
  };

  const moveUp = (index: number) => {
    if (index > 0) moveKindergarten(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index < selectedKindergartens.length - 1) moveKindergarten(index, index + 1);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveKindergarten(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const getPriorityColor = (index: number) => {
    if (index === 0) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (index === 1) return 'text-gray-600 bg-gray-50 border-gray-200';
    if (index === 2) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  const getPriorityIcon = (index: number) => {
    if (index === 0) return Trophy;
    if (index <= 2) return Target;
    return Star;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Star className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Arrange Your Priorities</h2>
        <p className="text-muted-foreground text-lg">Drag to reorder or use the arrow buttons to arrange your kindergarten preferences</p>
      </div>

      {/* Priority Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Priority System</h3>
            <p className="text-blue-700 mb-3">
              Kindergartens are allocated based on your priority order. Your first choice has the highest chance of placement.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                <Trophy className="h-3 w-3 mr-1" />
                1st Priority
              </Badge>
              <Badge className="bg-gray-100 text-gray-800 border-gray-300">
                <Target className="h-3 w-3 mr-1" />
                2nd Priority
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                <Target className="h-3 w-3 mr-1" />
                3rd Priority
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Kindergarten List */}
      <div className="space-y-4">
        {selectedKindergartens.map((kindergarten, index) => {
          const PriorityIcon = getPriorityIcon(index);
          
          return (
            <Card
              key={kindergarten.id}
              className={`border-2 transition-all duration-300 hover:shadow-lg cursor-move ${
                draggedIndex === index ? 'opacity-50 scale-95' : 'hover:scale-[1.01]'
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  {/* Priority Badge */}
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${getPriorityColor(index)}`}>
                    <PriorityIcon className="h-5 w-5" />
                    <span className="font-bold text-sm">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Kindergarten Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{kindergarten.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {kindergarten.municipality}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {kindergarten.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {kindergarten.availableSpots} spots
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {kindergarten.features?.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {kindergarten.features?.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{kindergarten.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <GripVertical className="h-5 w-5 text-muted-foreground mx-auto" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveDown(index)}
                      disabled={index === selectedKindergartens.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeKindergarten(kindergarten.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/20">
        <div className="flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            You can change this order anytime before submitting
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Shuffle kindergartens for fun
            const shuffled = [...selectedKindergartens].sort(() => Math.random() - 0.5);
            clearCart();
            shuffled.forEach(kg => addKindergarten(kg));
          }}
        >
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle Order
        </Button>
      </div>
    </div>
  );
};

export default KindergartenPriorityManager;